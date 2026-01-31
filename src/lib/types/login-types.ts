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
