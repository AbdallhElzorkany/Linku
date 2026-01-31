"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { LoginFormState, LoginError } from "@/lib/types/login-types";
const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function login(
  prevState: LoginFormState | undefined,
  formData: FormData
) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const validation = loginSchema.safeParse(data);
  const formError: LoginError = {};

  // Populate error object with validation errors
  if (!validation.success) {
    const fieldErrors = z.treeifyError(validation.error);
    if (
      fieldErrors.properties?.email &&
      fieldErrors.properties.email.errors.length > 0
    ) {
      formError.email = fieldErrors.properties.email.errors[0];
    }

    if (
      fieldErrors.properties?.password &&
      fieldErrors.properties.password.errors.length > 0
    ) {
      formError.password = fieldErrors.properties.password.errors[0];
    }
    return {
      errors: formError,
      inputs: data,
    };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(validation.data);
  if (error) {
    return {
      errors: { message: error.message },
      inputs: data,
    };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
