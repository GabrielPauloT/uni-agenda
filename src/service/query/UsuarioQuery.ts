import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useApiQuery } from "../hooks/Query";
import { UsuarioRquest } from "../requests";
import { Usuario } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createUsuario } from "../requests/UsuarioRequest";

export function useFindAllUsuario(page: number, perPage: number) {
  return useApiQuery<Usuario[]>({
    queryKey: [ReactQueryKeysEnum.USUARIO_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await UsuarioRquest.findAllUsuario(page, perPage);
      return data;
    },
  });
}

export function useCreateUsuario() {
  const mutation = useMutation((usuarioData: Usuario) =>
    createUsuario(usuarioData),
  );
  return mutation;
}
