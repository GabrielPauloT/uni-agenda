import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

import { UsuarioRquest } from "../requests";
import {
  createUsuario,
  deleteUser,
  updateUser,
} from "../requests/UsuarioRequest";
import { Usuario } from "../types";

export function useUsuario(page: number, perPage: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.USUARIO_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await UsuarioRquest.findAllUsuario(page, perPage);
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

export function useDeleteUsuario() {
  const mutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
  });
  return mutation;
}

export function useUpdateUsuario() {
  const mutation = useMutation({
    mutationFn: ({
      userId,
      usuarioData,
    }: {
      userId: number;
      usuarioData: Partial<Usuario>;
    }) => updateUser(userId, usuarioData),
  });
  return mutation;
}
