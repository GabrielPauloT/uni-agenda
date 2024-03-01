export type authRequestType = {
  email: string;
  senha: string;
};

export type authResponseType = {
  token: string;
  message: string;
  statusCode: number;
  error: string;
};
