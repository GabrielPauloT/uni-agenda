"use client";
import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout/layout";
import { SalaQuery } from "@/service/query";
import { Sala } from "@/service/types";
import { tipoSala } from "@/types/enums/enums";
import { useState } from "react";

export default function Sala() {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data: salaData } = SalaQuery.useFindAllSala(page, perPage);

  const { data: gambiarra } = SalaQuery.useFindAllSala(1, 100);

  const onNextPageClick = () => {
    setPage(page + 1);
  };

  const onBackPageClick = () => {
    setPage(page - 1);
  };

  const onEditClick = (row: Sala) => {
    console.log(row);
  };

  const onDeleteClick = (row: Sala) => {
    console.log(row);
  };

  const onViewClick = (row: Sala) => {
    console.log(row);
  };

  const [isAddingSala, setIsAddingSala] = useState(false);

  const onAddSalaClick = () => {
    setIsAddingSala(true);
  };

  const formattedData = salaData?.map((sala) => ({
    ...sala,
    createdat: new Date(sala.createdat).toLocaleDateString("pt-BR"),
    updatedat: new Date(sala.updatedat).toLocaleDateString("pt-BR"),
  }));

  const TotalRecord = gambiarra?.length;

  return (
    <Layout pageTitle="Sala">
      <div className="flex min-h-screen flex-col justify-center text-center align-middle">
        <h1 className="mb-12 mt-6 text-3xl font-semibold tracking-wide">
          Sala
        </h1>
        <div className="m-auto h-full w-full flex-grow overflow-auto">
          <div className="mr-4 flex justify-end">
            <button
              onClick={onAddSalaClick}
              className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Adicionar Nova Sala
            </button>
          </div>
          {salaData ? (
            <DataTable
              data={formattedData}
              page={page}
              total={TotalRecord}
              perPage={perPage}
              onNextPageClick={onNextPageClick}
              onBackPageClick={onBackPageClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onViewClick={onViewClick}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
