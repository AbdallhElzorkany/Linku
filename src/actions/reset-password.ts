"use server";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const resetRequestSchema = z.object({
  email: z.email(),
});

export type resetRequestFormState = {
  errors?: resetRequestError;
  inputs?: {
    email?: string;
  };
  success?: boolean;
};

export type resetRequestError = {
  message?: string;
  email?: string;
};

export async function resetRequest(
  prevState: resetRequestFormState | undefined,
  formData: FormData
) {
  const data = {
    email: formData.get("email") as string,
  };
  const validation = resetRequestSchema.safeParse(data);
  const formError: resetRequestError = {};

  if (!validation.success) {
    const fieldErrors = z.treeifyError(validation.error);
    if (
      fieldErrors.properties?.email &&
      fieldErrors.properties.email.errors.length > 0
    ) {
      formError.email = fieldErrors.properties.email.errors[0];
    }
    return {
      errors: formError,
      inputs: data,
      success: false,
    };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    validation.data.email,
    {
      redirectTo: "http://localhost:3000/reset-password/confirmation",
    }
  );
  if (error) {
    return {
      errors: { message: error.message },
      inputs: data,
      success: false,
    };
  }
  return {
    errors: {},
    inputs: data,
    success: true,
  };
}
