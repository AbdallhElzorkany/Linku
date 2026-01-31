"use server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { resetPasswordError, resetPasswordFormState } from "../types/reset-password-types";
const resetPasswordSchema = z
  .object({
    code: z.string().nonempty("Code is required"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, include one lowercase letter, one uppercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



export async function resetPassword(
  prevState: resetPasswordFormState | undefined,
  formData: FormData
) {
  const data = {
    code: formData.get("code") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validation = resetPasswordSchema.safeParse(data);
  const formError: resetPasswordError = {};

  if (!validation.success) {
    const fieldErrors = z.treeifyError(validation.error);
    if (
      fieldErrors.properties?.code &&
      fieldErrors.properties.code.errors.length > 0
    ) {
      formError.message = "Session Expired"
    }

    if (
      fieldErrors.properties?.password &&
      fieldErrors.properties.password.errors.length > 0
    ) {
      formError.password = fieldErrors.properties.password.errors[0];
    }

    if (
      fieldErrors.properties?.confirmPassword &&
      fieldErrors.properties.confirmPassword.errors.length > 0
    ) {
      formError.confirmPassword =
        fieldErrors.properties.confirmPassword.errors[0];
    }
    return {
      errors: formError,
      inputs: data,
    };
  }

  const supabase = await createClient();
  await supabase.auth.exchangeCodeForSession(validation.data.code);

  const { error } = await supabase.auth.updateUser({
    password: validation.data.password,
  });

  if (error) {
    return {
      errors: { message: error.message },
      inputs: data,
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
