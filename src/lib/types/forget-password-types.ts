export type forgotRequestFormState = {
  errors?: forgotRequestError;
  inputs?: {
    email?: string;
  };
  success?: boolean;
};

export type forgotRequestError = {
  message?: string;
  email?: string;
};