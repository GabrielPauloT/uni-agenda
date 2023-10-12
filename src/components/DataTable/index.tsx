import React from "react";
import { Icons } from "../Icons";
import { Spinner } from "../Spinner";

export type DataTableProps = {
  data: any[] | undefined;
  perPage: number;
  total: number | undefined;
  page: number;
  onNextPageClick: () => void;
  onBackPageClick: () => void;
  onEditClick: (row: any) => void;
  onDeleteClick: (row: any) => void;
  onViewClick: (row: any) => void;
};

export function DataTable({
  page,
  data,
  perPage,
  total,
  onNextPageClick,
  onBackPageClick,
  onEditClick,
  onDeleteClick,
  onViewClick,
}: DataTableProps) {
  const totalPages = Math.ceil((total ?? 0) / perPage);

  if (!data || data.length === 0) {
    return (
      <div className="m-auto flex h-96 w-auto items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="flex h-full w-full flex-col p-4">
      <table className="max-h-full w-full table-auto border-collapse rounded-full border">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((column) => (
              <th
                key={column}
                className="h-[2.5rem] border-b border-gray-300 px-4 py-2 text-left"
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
            <th className="h-[2.5rem] border-b border-gray-300 px-4 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              {columns.map((column) => (
                <td
                  key={column}
                  className="border-b border-gray-300 px-4 py-2 text-left"
                >
                  {row[column]}
                </td>
              ))}
              <td className="border-b border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => onEditClick(row)}
                  className="mr-2 text-blue-500 hover:text-blue-700"
                >
                  <Icons name="MdEdit" size={20} />
                </button>
                <button
                  onClick={() => onDeleteClick(row)}
                  className="mr-2 text-red-500 hover:text-red-700"
                >
                  <Icons name="MdDelete" size={20} />
                </button>
                <button
                  onClick={() => onViewClick(row)}
                  className="text-green-500 hover:text-green-700"
                >
                  <Icons name="MdVisibility" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end ">
        <div className="flex gap-4">
          {totalPages > 1 && page > 1 && (
            <button
              onClick={onBackPageClick}
              className="rounded bg-blue-600 px-4 py-0 font-bold text-white hover:bg-primary-100"
            >
              <Icons name="MdNavigateBefore" size={20} />
            </button>
          )}
          <p>
            Página {page} de {totalPages}
          </p>
          {page < totalPages && (
            <button
              onClick={onNextPageClick}
              className="rounded bg-blue-600 px-4 py-1 font-bold text-white hover:bg-primary-100"
            >
              <Icons name="MdNavigateNext" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
