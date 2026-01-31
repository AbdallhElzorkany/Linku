export type resetPasswordFormState = {
  errors?: resetPasswordError;
  inputs?: {
    code?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export type resetPasswordError = {
  message?: string;
  password?: string;
  confirmPassword?: string;
};
