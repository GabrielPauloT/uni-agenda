import moment from "moment";

import { Input } from "@/components";
import { useSolicitante } from "@/service/hooks/SolicitanteQuery";

import { ModalAgendaInputType } from "./type";

export function ModalInputAgenda({
  data,
  isEdit,
  onChageTema,
  onChageNome,
  onChageDataIni,
  onChageDataFim,
  onChageHoraIni,
  onChageHoraFim,
  onChageFalta,
  onClick,
  onSubmit,
}: ModalAgendaInputType) {
  const { data: solicitanteData } = useSolicitante(
    1,
    200,
    data?.Solicitante?.toString() ?? undefined,
  );
  function formatDate(date: string) {
    const dataT = moment(date).format("YYYY-MM-DD");

    return dataT;
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <select id="select-state" placeholder="Pick a state...">
        <option value="">Select a state...</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
      </select>
      <Input
        type="search"
        title="Nome do Solicitante"
        placeholder="Nome do Solicitante"
        id="Nome"
        name="Nome"
        value={data?.Solicitante.nome || ""}
        onChange={onChageNome}
        required={isEdit}
      />
      <Input
        type="text"
        title="Tema"
        placeholder="Tema"
        id="Tema"
        name="Tema"
        value={data?.tema || ""}
        onChange={onChageTema}
        required={isEdit}
      />
      <div className="flex w-full gap-3">
        <div className="flex w-50% flex-col">
          <label>Data Inicio:</label>
          <input
            type="date"
            placeholder="Data"
            name="start"
            value={formatDate(data?.dataInicial)}
            onChange={onChageDataIni}
            className="rounded-md border-2 border-gray-300 p-2"
            required={isEdit}
          />
        </div>
        <div className="flex w-50% flex-col">
          <label>Data Fim:</label>
          <input
            type="date"
            placeholder="Data"
            name="end"
            value={formatDate(data?.dataFinal)}
            onChange={onChageDataFim}
            className="rounded-md border-2 border-gray-300 p-2"
            required={isEdit}
          />
        </div>
      </div>
      <div className="flex w-full gap-3">
        <div className="flex w-50% flex-col">
          <label>Hora Inicio:</label>
          <input
            type="time"
            placeholder="Time"
            name="start"
            value={data?.horaInical}
            onChange={onChageHoraIni}
            className="rounded-md border-2 border-gray-300 p-2"
            required={isEdit}
          />
        </div>
        <div className="flex w-50% flex-col">
          <label>Hora Fim:</label>
          <input
            type="time"
            placeholder="Time"
            name="end"
            value={data?.horaFinal}
            onChange={onChageHoraFim}
            className="rounded-md border-2 border-gray-300 p-2"
            required={isEdit}
          />
        </div>
      </div>
      <div className="ml-1 flex items-center gap-3">
        <input
          type="checkbox"
          name="end"
          checked={data?.falta as boolean}
          onChange={onChageFalta}
          className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-gray-700">Faltou</label>
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
