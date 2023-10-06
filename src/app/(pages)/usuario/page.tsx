"use client";
import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout/layout";
import { UsuarioQuery } from "@/service/query";
import { Usuario } from "@/service/types";
import { useState } from "react";

export default function Usuario() {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data: usuarioData } = UsuarioQuery.useFindAllSala(page, perPage);

  const { data: gambiarra } = UsuarioQuery.useFindAllSala(1, 100);

  const onNextPageClick = () => {
    setPage(page + 1);
  };

  const onBackPageClick = () => {
    setPage(page - 1);
  };

  const onEditClick = (row: Usuario) => {
    console.log(row);
  };

  const onDeleteClick = (row: Usuario) => {
    console.log(row);
  };

  const onViewClick = (row: Usuario) => {
    console.log(row);
  };

  const [isAddingUser, setIsAddingUser] = useState(false);

  const onAddUserClick = () => {
    setIsAddingUser(true);
  };

  const formattedData = usuarioData?.map((usuario) => ({
    ...usuario,
    createdat: new Date(usuario.createdat).toLocaleDateString("pt-BR"),
    updatedat: new Date(usuario.updatedat).toLocaleDateString("pt-BR"),
  }));

  const TotalRecord = gambiarra?.length;

  return (
    <Layout pageTitle="Usuario">
      <div className="flex min-h-screen flex-col justify-center text-center align-middle">
        <h1 className="mb-12 mt-6 text-3xl font-semibold tracking-wide">
          Usuario
        </h1>
        <div className="m-auto h-full w-full flex-grow overflow-auto">
          <div className="mr-4 flex justify-end">
            <button
              onClick={onAddUserClick}
              className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Adicionar Novo Usuário
            </button>
          </div>
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
        </div>
      </div>
    </Layout>
  );
}
