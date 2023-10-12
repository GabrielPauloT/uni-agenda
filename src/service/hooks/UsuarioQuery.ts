import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

import { UsuarioRquest } from "../requests";
import { createUsuario } from "../requests/UsuarioRequest";
import { Usuario } from "../types";

export function useFindAllUsuario(page: number, perPage: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.USUARIO_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await UsuarioRquest.findAllUsuario(page, perPage);
      console.log("findall", data);
      return data;
    },
  });
}

export function useCreateUsuario() {
  const mutation = useMutation({
    mutationFn: (usuarioData: Usuario) => createUsuario(usuarioData),
  });
  return mutation;
}
