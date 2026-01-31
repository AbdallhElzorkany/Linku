"use server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { forgotRequestError, forgotRequestFormState } from "../types/forget-password-types";

const forgotRequestSchema = z.object({
  email: z.email(),
});



export async function forgotRequest(
  prevState: forgotRequestFormState | undefined,
  formData: FormData
) {
  const data = {
    email: formData.get("email") as string,
  };
  const validation = forgotRequestSchema.safeParse(data);
  const formError: forgotRequestError = {};

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
      redirectTo: "http://localhost:3000/forgot-password/reset",
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
