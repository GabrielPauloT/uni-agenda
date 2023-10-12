"use client";
import { DataTable } from "@/components/DataTable";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout/layout";
import { Modal } from "@/components/Modal";
import { UsuarioQuery } from "@/service/query";
import { useCreateUsuario } from "@/service/query/UsuarioQuery";
import { Usuario } from "@/service/types";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { dataUsuario, formUsuario } from "./type";

export default function Usuario() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const formMethods = useForm<formUsuario>();
  const [data, setData] = useState({
    Nome: "",
    Email: "",
    Senha: "",
  });
  const perPage = 10;
  const closeModal = () => {
    formMethods.reset();
    setData({
      Nome: "",
      Email: "",
      Senha: "",
    });
    setOpenModalView(false);
    setOpenModal(false);
  };
  const { data: usuarioData } = UsuarioQuery.useFindAllUsuario(page, perPage);

  const createUsuarioMutation = useCreateUsuario();

  const { data: gambiarra } = UsuarioQuery.useFindAllUsuario(1, 100);

  const onEditClick = (row: dataUsuario) => {
    setTitle("Editar Usuario");
    setData({
      Nome: row.nome,
      Email: row.email,
      Senha: row.senha || "",
    });
    setOpenModal(true);
  };

  const onDeleteClick = (row: dataUsuario) => {
    console.log(row);
  };

  const onViewClick = (row: dataUsuario) => {
    setTitle("Visualizar Usuario");
    setData({
      Nome: row.nome,
      Email: row.email,
      Senha: row.senha || "",
    });
    setOpenModalView(true);
    setOpenModal(true);
  };

  const onAddUserClick = () => {
    setTitle("Cadastrar Usuario");
    setOpenModal(true);
  };

  const formattedData = usuarioData?.map((usuario) => ({
    ...usuario,
    createdat: usuario?.createdat
      ? new Date(usuario.createdat).toLocaleDateString("pt-BR")
      : new Date().toLocaleDateString("pt-BR"),
    updatedat: usuario?.updatedat
      ? new Date(usuario.updatedat).toLocaleDateString("pt-BR")
      : new Date().toLocaleDateString("pt-BR"),
  }));

  const TotalRecord = gambiarra?.length || 0;

  const onSubmit: SubmitHandler<formUsuario> = (data) => {
    createUsuarioMutation.mutateAsync(data);
    closeModal();
  };

  return (
    <Layout pageTitle="Usuario">
      <div className="justify-centeralign-middle flex min-h-screen flex-col">
        <h1 className="mb-12 mt-6 text-center text-3xl font-semibold tracking-wide">
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
            <Modal isOpen={openModal} title={title}>
              {openModalView ? (
                <div className="mx-auto my-8 flex max-w-md flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-xl">
                  <div className="flex w-full flex-col space-y-2">
                    <p className="text-lg font-medium text-gray-900">
                      Nome:{" "}
                      <span className="font-light text-gray-500">
                        {data.Nome}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      Email:{" "}
                      <span className="font-light text-gray-500">
                        {data.Email}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      Senha:{" "}
                      <span className="font-light text-gray-500">
                        *************
                      </span>
                    </p>
                  </div>
                  <button
                    type="reset"
                    className="w-full rounded-md bg-red-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <FormProvider {...formMethods}>
                  <form
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                  >
                    <Input
                      type="text"
                      title="Nome"
                      placeholder="Nome"
                      id="Nome"
                      name="Nome"
                      value={data.Nome || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          Nome: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="email"
                      title="Email"
                      placeholder="Email"
                      id="Email"
                      name="Email"
                      value={data.Email || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          Email: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="Password"
                      title="Senha"
                      placeholder="Senha"
                      id="Senha"
                      name="Senha"
                      value={data.Senha || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          Senha: e.target.value,
                        })
                      }
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
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </FormProvider>
              )}
            </Modal>
          </div>
          <DataTable
            data={formattedData}
            page={page}
            total={TotalRecord}
            perPage={perPage}
            onNextPageClick={() => setPage(page + 1)}
            onBackPageClick={() => setPage(page - 1)}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onViewClick={onViewClick}
          />
        </div>
      </div>
    </Layout>
  );
}
