export type registerFormState = {
  errors?: registerError;
  inputs?: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  success?: boolean;
};
export type registerError = {
  message?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};