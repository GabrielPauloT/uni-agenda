import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components";
import { useTipoSolicitante } from "@/service/hooks/TipoSolicitanteQuery";

import { ModalInputProps } from "./type";

export function ModalInput({
  data,
  onClick,
  onSubmit,
  onChageNome,
  onChageCapacidade,
  isEdit,
}: ModalInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [totalRecords, setTotalRecords] = useState(0);
  const { data: tipoSolicitanteData } = useTipoSolicitante(1, totalRecords);

  useEffect(() => {
    setTotalRecords(tipoSolicitanteData?.TotalRecords || 0);
  }, [tipoSolicitanteData]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Input
        register={register}
        erros={errors}
        type="text"
        title="Nome do Solicitante:"
        placeholder="Nome do Solicitante"
        id="NomeSolicitante"
        name="NomeSolicitante"
        value={data.NomeSolicitante || ""}
        onChange={onChageNome}
        required={isEdit}
      />
      <Input
        register={register}
        erros={errors}
        type="text"
        title="Email do Solicitante:"
        placeholder="Email do Solicitante"
        id="EmailSolicitante"
        name="EmailSolicitante"
        value={data.EmailSolicitante || ""}
        onChange={onChageCapacidade}
        required={isEdit}
      />
      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Tipo Solicitante:
        </label>
        <select
          title="Lista de tipo de sala"
          id="idTipo"
          placeholder="Selecione o tipo da sala"
          className="h-10 w-full rounded-md border border-gray-300 pl-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          {...register("IdTipoSolicitante", {
            required: true,
          })}
          value={data.IdTipoSolicitante || ""}
        >
          {tipoSolicitanteData?.Result.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nomedotipo}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center gap-5">
        <button
          type="submit"
          className="mt-4 w-44 rounded bg-blue-500 px-4 py-2 text-white hover:bg-primary-100"
        >
          Enviar
        </button>
        <button
          type="reset"
          className="mt-4 w-44 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={onClick}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
