import { ReactQueryKeysEnum } from "@/types/enums/reactQuery";
import { useApiQuery } from "../hooks/Query";
import { UsuarioRquest } from "../requests";
import { Usuario } from "../types";

export function useFindAllSala(page: number, perPage: number) {
  return useApiQuery<Usuario[]>({
    queryKey: [ReactQueryKeysEnum.USUARIO_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await UsuarioRquest.findAllUsuario(page, perPage);
      return data;
    },
  });
}
