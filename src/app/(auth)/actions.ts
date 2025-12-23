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
  formData: FormData,
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
      errors: { message: "Invalid Email or Password" },
      inputs: data,
    };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

const registerSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type registerFormState = {
  errors?: registerError;
  inputs?: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};
export type registerError = {
  message?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
export async function register(
  prevState: registerFormState | undefined,
  formData: FormData,
) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const validation = registerSchema.safeParse(data);
  const formError: registerError = {};

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
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: "http://localhost:3000/register/email-confirmation/confirmed",
    }
  });
  if (error) {
    return {
      errors: { message: error.message },
      inputs: data,
    };
  }
  redirect("/register/email-confirmation");
}