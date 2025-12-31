"use server";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, include one lowercase letter, one uppercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type resetPasswordFormState = {
  errors?: resetPasswordError;
  inputs?: {
    password?: string;
    confirmPassword?: string;
  };
};

export type resetPasswordError = {
  message?: string;
  password?: string;
  confirmPassword?: string;
};

export async function resetPassword(
  prevState: resetPasswordFormState | undefined,
  formData: FormData
) {
  const data = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const validation = resetPasswordSchema.safeParse(data);
  const formError: resetPasswordError = {};

  if (!validation.success) {
    const fieldErrors = z.treeifyError(validation.error);
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
