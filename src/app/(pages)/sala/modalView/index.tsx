import { ModalViewType } from "./type";

export function ModalView({ data, onClick }: ModalViewType) {
  console.log({ data }, "modalView");
  return (
    <div className="mx-auto my-8 flex max-w-md flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-xl">
      <div className="flex w-full flex-col space-y-2">
        <p className="text-lg font-medium text-gray-900">
          Nome da Sala:
          <span className="font-light text-gray-500"> {data.nome}</span>
        </p>
        <p className="text-lg font-medium text-gray-900">
          Capacidade:
          <span className="font-light text-gray-500"> {data.capacidade}</span>
        </p>
        <p className="text-lg font-medium text-gray-900">
          Tipo da sala:
          <span className="font-light text-gray-500"> {data.tipo}</span>
        </p>
      </div>
      <button
        type="reset"
        className="w-full rounded-md bg-red-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={onClick}
      >
        Cancelar
      </button>
    </div>
  );
}
