"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export type LoginFormState = {
  errors?: LoginError;
  inputs?: {
    email?: string;
    password?: string;
  };
};
export type LoginError = {
  message?: string;
  email?: string;
  password?: string;
};
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
    console.log(fieldErrors);
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
    console.log(error);
    return {
      errors: { message: "Invalid Email or Password" },
      inputs: data,
    };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.log(error);
    return;
  }
  redirect("/register/get-started");
}
