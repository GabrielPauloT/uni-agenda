import { api } from "..";

import { authRequestType } from "../types/auth";

export function authRequest(authData: authRequestType) {
  return api.post("/auth/login", {
    email: authData.email,
    senha: authData.senha,
  });
}
