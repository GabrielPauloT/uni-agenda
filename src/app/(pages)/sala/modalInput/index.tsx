import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components";
import { useTipoSala } from "@/service/hooks/TipoSalaQuery";

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
  const { data: tipoSalaData } = useTipoSala(1, totalRecords);

  useEffect(() => {
    setTotalRecords(tipoSalaData?.TotalRecords || 0);
  }, [tipoSalaData]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Input
        register={register}
        erros={errors}
        type="text"
        title="NomeDaSala"
        placeholder="Nome da Sala"
        id="NomeDaSala"
        name="NomeDaSala"
        value={data.nome || ""}
        onChange={onChageNome}
        required={isEdit}
      />
      <Input
        register={register}
        erros={errors}
        type="number"
        title="Capacidade"
        placeholder="Capacidade"
        id="Capacidade"
        name="Capacidade"
        value={data.capacidade || ""}
        onChange={onChageCapacidade}
        required={isEdit}
      />
      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Sala:
        </label>
        <select
          title="Lista de tipo de sala"
          id="IdTipoDaSala"
          placeholder="Selecione o tipo da sala"
          className="h-10 w-full rounded-md border border-gray-300 pl-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          {...register("IdTipoDaSala", {
            required: true,
          })}
        >
          {tipoSalaData?.Result.map((tipo) => (
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
