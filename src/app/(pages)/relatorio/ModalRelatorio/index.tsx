import { useFormContext } from "react-hook-form";

import { Input } from "@/components";

import { ModalRelatorioProps } from "./type";

export function ModalRelatorio({
  onSubmit,
  onChageDataInicio,
  onChageDataFim,
  onClick,
}: ModalRelatorioProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Input
        register={register}
        erros={errors}
        type="date"
        title="Data Inicio:"
        id="dataInicio"
        name="dataInicio"
        value={""}
        onChange={onChageDataInicio}
        required
      />
      <Input
        register={register}
        erros={errors}
        type="date"
        title="Data Fim:"
        id="dataFim"
        name="dataFim"
        value={""}
        onChange={onChageDataFim}
        required
      />
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
