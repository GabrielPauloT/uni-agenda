/* eslint-disable import-helpers/order-imports */
import { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import moment from "moment";

import { DiaSemanaEnum, ReactQueryKeysEnum } from "@/@types";
import { Input } from "@/components";
import { useCreateFalta } from "@/service/hooks/FaltaQuery";
import { useSala } from "@/service/hooks/SalaQuery";
import { useSolicitante } from "@/service/hooks/SolicitanteQuery";

const animatedComponents = makeAnimated();

import { useQueryClient } from "@tanstack/react-query";

import { ModalAgendaInputType } from "./type";

export function ModalInputAgenda({
  data,
  dataTableCreated,
  isEdit,
  onChageTema,
  onChageDataIni,
  onChageDataFim,
  onChageHoraIni,
  onChageHoraFim,
  onChageFalta,
  onClick,
  onSubmit,
}: ModalAgendaInputType) {
  const [totalRecordsSolicitante, setTotalRecordSolicitante] = useState(0);
  const queryCliente = useQueryClient();
  const [totalRecordsSala, setTotalRecordSala] = useState(0);
  const { data: solicitanteData } = useSolicitante(
    1,
    totalRecordsSolicitante,
    data?.Solicitante?.toString() ?? undefined,
  );
  const { data: salaData } = useSala(1, totalRecordsSala);

  const createFaltaMutation = useCreateFalta();

  useEffect(() => {
    setTotalRecordSolicitante(solicitanteData?.TotalRecords || 0);
    setTotalRecordSala(salaData?.TotalRecords || 0);
  }, [solicitanteData, salaData]);

  const solicitanteConcatPlaceholder = useMemo(() => {
    return [
      { Id: 0, NomeSolicitante: "Selecione o solicitante" },
      ...(solicitanteData?.Result || []),
    ];
  }, [solicitanteData]);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const diaSemanaOptions = Object.keys(DiaSemanaEnum)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: DiaSemanaEnum[key as keyof typeof DiaSemanaEnum],
      label: key,
    }));

  function formatDate(date: string, isEnd?: boolean) {
    if (!!isEnd && !isEdit) {
      return moment(date).format("YYYY-MM-DD");
    }
    return moment(date).add(7, "day").format("YYYY-MM-DD");
  }
  function formatHours(date: string) {
    const hourFormated = moment(date).format("HH:mm");

    return hourFormated;
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Solicitante:
        </label>
        <select
          title="Lista de solicitantes"
          id="idSoliciante"
          placeholder="Selecione o solicitante"
          className="h-10 w-full rounded-md border border-gray-300 pl-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          {...register("IdSoliciante", {
            // required: true,
            // value: 0,
            disabled: isEdit,
          })}
        >
          {solicitanteConcatPlaceholder?.map((item) => {
            return (
              <option key={item.Id} value={item.Id}>
                {item.NomeSolicitante}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Dias da Semana:
        </label>
        <Controller
          name="DiaSemana"
          control={control}
          disabled={isEdit}
          render={({ field: { onChange, value } }) => (
            <Select
              isDisabled={isEdit}
              isMulti
              components={animatedComponents}
              name="DiaSemana"
              options={diaSemanaOptions}
              classNamePrefix="select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#3182ce" : "white",
                  color: state.isSelected ? "white" : "black",
                }),
                multiValue: (provided) => ({
                  ...provided,
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "fit-content",
                }),
              }}
              onChange={(selectedValues: any) => {
                onChange(selectedValues);
              }}
              value={value}
            />
          )}
        />
      </div>
      <Input
        register={register}
        erros={errors}
        type="text"
        title="Tema:"
        placeholder="Tema"
        id="Tema"
        name="tema"
        value={""}
        onChange={onChageTema}
        required={isEdit}
        disable={isEdit}
      />
      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Sala:
        </label>
        <select
          title="Lista de salas"
          id="resourceId"
          placeholder="Selecione a sala"
          className="h-10 w-full rounded-md border border-gray-300 pl-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          {...register("resourceId", {
            // required: true,
            value: dataTableCreated?.resourceId ?? "",
            disabled: isEdit,
          })}
          value={dataTableCreated?.resourceId ?? ""}
        >
          {salaData?.Result.map((sala) => (
            <option key={sala.id} value={sala.id}>
              {sala.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full gap-3">
        <div className="flex w-50% flex-col">
          <Input
            register={register}
            erros={errors}
            type="date"
            title="Data Inicio:"
            placeholder="Data Inicio"
            id="Data Inicio"
            name="start"
            value={formatDate(
              isEdit
                ? data?.dataInicial || ""
                : dataTableCreated?.start.toISOString() || "",
              true,
            )}
            onChange={onChageDataIni}
            required={isEdit}
            disable={isEdit}
          />
        </div>
        <div className="flex w-50% flex-col">
          <Input
            register={register}
            erros={errors}
            type="date"
            title="Data Fim:"
            placeholder="Data Fim"
            id="Data Fim"
            name="end"
            value={formatDate(
              isEdit
                ? data?.dataFinal || ""
                : dataTableCreated?.end.toISOString() || "",
            )}
            onChange={onChageDataFim}
            required={isEdit}
            disable={isEdit}
          />
        </div>
      </div>
      <div className="flex w-full gap-3">
        <div className="flex w-50% flex-col">
          <Input
            register={register}
            erros={errors}
            type="time"
            title="Hora Inicio:"
            placeholder="Hora Inicio"
            id="Hora Inicio"
            name="horaInical"
            value={
              isEdit
                ? data?.horaInical || ""
                : formatHours(dataTableCreated?.start.toISOString() || "")
            }
            onChange={onChageHoraIni}
            required={isEdit}
          />
        </div>
        <div className="flex w-50% flex-col">
          <Input
            register={register}
            erros={errors}
            type="time"
            title="Hora Fim:"
            placeholder="Hora Fim"
            id="Hora fim"
            name="horaFinal"
            value={
              isEdit
                ? data?.horaFinal || ""
                : formatHours(dataTableCreated?.end.toISOString() || "")
            }
            onChange={onChageHoraFim}
            required={isEdit}
          />
        </div>
      </div>
      {isEdit && (
        // <div className="flex flex-col items-center gap-3">
        //   <label className="text-gray-700">Solicitante faltou?</label>
        //   <input
        //     type="checkbox"
        //     name="end"
        //     checked={data?.falta as boolean}
        //     onChange={onChageFalta}
        //     className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
        //   />
        // </div>
        <div className="flex flex-col items-center gap-3">
          <label className="text-gray-700">Solicitante faltou?</label>
          <input
            type="checkbox"
            name="falta"
            checked={data?.falta as boolean}
            onChange={(e) => {
              const isChecked = e.target.checked;

              if (isChecked && data?.id) {
                const faltaData = {
                  IdAgendamento: data.id,
                  Data: new Date(data?.dataAgendamento).toISOString(),
                };

                createFaltaMutation.mutate(faltaData);
                queryCliente.invalidateQueries([
                  ReactQueryKeysEnum.AGENDAMENTO_FINDALL,
                ]);
              }
              // @ts-expect-error
              onChageFalta(e);
            }}
            className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
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
