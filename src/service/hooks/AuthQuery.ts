import { useMutation } from "@tanstack/react-query";

import { authRequest } from "../requests/AuthRequest";
import { authRequestType } from "../types/auth";

export function useAuth() {
  const mutation = useMutation({
    mutationFn: (authData: authRequestType) => authRequest(authData),
  });
  return mutation;
}
