/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { ReactQueryKeysEnum } from "@/@types";
import { Modal } from "@/components";
import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { SolicitanteQuery } from "@/service/hooks";
import { useCreateSolicitante } from "@/service/hooks/SolicitanteQuery";
import { Solicitante } from "@/service/types";
import { useQueryClient } from "@tanstack/react-query";

import { ToastStateType } from "../usuario/type";

import { ModalInput } from "./modalInput";
import { ModalView } from "./modalView";
import { FormSolicitanteType, ModalDataViewType } from "./type";

const PER_PAGE = 6;
const DEFAULT_SALA_DATA: FormSolicitanteType = {
  Id: 0,
  IdTipoSolicitante: 0,
  NomeTipoSolicitante: "",
  NomeSolicitante: "",
  EmailSolicitante: "",
  CriadoEm: new Date(),
  AtualizadoEm: new Date(),
};

const DEFAULT_SALA_DATA_VIEW: ModalDataViewType = {
  Nome: "",
  Email: "",
  tipo: "",
};

export default function Solicitantes() {
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState<ToastStateType>();
  const queryCliente = useQueryClient();
  const [dataSolicitante, setDataSolicitante] = useState(DEFAULT_SALA_DATA);
  const [dataViewSolicitante, setDataViewSolicitante] = useState(
    DEFAULT_SALA_DATA_VIEW,
  );
  const [openModalView, setOpenModalView] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const formMethods = useForm<FormSolicitanteType>();
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data: solicitanteData } = SolicitanteQuery.useSolicitante(
    page,
    perPage,
  );

  const resetData = () => {
    setDataViewSolicitante(DEFAULT_SALA_DATA_VIEW);
    setDataSolicitante(DEFAULT_SALA_DATA);
  };

  const showSuccessToast = (message: string) => {
    setToast({ type: "success", message });
  };

  const showErrorToast = (message: string) => {
    setToast({ type: "error", message });
  };

  const createSolicitanteMutation = useCreateSolicitante();

  const closeModal = () => {
    formMethods.reset();
    resetData();
    setOpenModalView(false);
    setOpenModal(false);
  };

  const onEditClick = (row: Solicitante) => {
    console.log(row);
  };

  const onDeleteClick = (row: Solicitante) => {
    console.log(row);
  };

  const onViewClick = useCallback((row: ModalDataViewType) => {
    setTitle("Visualizar Sala");
    setDataViewSolicitante({
      Nome: row.Nome,
      Email: row.Email,
      tipo: row.tipo,
    });
    setOpenModalView(true);
    setOpenModal(true);
  }, []);

  const onAddSolicitanteClick = () => {
    setTitle("Adicionar Novo Solicitante");
    setOpenModal(true);
  };

  const formattedData = useMemo(
    () =>
      solicitanteData?.Result.map((solicitante) => {
        const {
          Id,
          NomeSolicitante: Nome,
          EmailSolicitante: Email,
          IdTipoSolicitante,
          NomeTipoSolicitante,
          ...rest
        } = solicitante;
        return {
          Id,
          Nome,
          Email,
          tipo: solicitante?.NomeTipoSolicitante || "",
          ...rest,
          CriadoEm: solicitante?.CriadoEm
            ? new Date(solicitante.CriadoEm).toLocaleDateString("pt-BR")
            : "",
          AtualizadoEm: solicitante?.AtualizadoEm
            ? new Date(solicitante.AtualizadoEm).toLocaleDateString("pt-BR")
            : "",
        };
      }),
    [solicitanteData],
  );

  const onSubmit: SubmitHandler<FormSolicitanteType> = (data) => {
    const idTipo = Number(data.IdTipoSolicitante);
    const dataFormatada = {
      ...data,
      IdTipoSolicitante: idTipo,
    };
    // if (title === "Editar Usuario") {
    //   updateSolicitanteMutation
    //     .mutateAsync({
    //       userId: userData.Id,
    //       usuarioData: data,
    //     })
    //     .then(() => {
    //       showSuccessToast("Usuario atualizado com sucesso");
    //       queryCliente.invalidateQueries([ReactQueryKeysEnum.USUARIO_FINDALL]);
    //     })
    //     .catch(() => {
    //       showErrorToast("Erro ao atualizar usuario");
    //     });
    // } else if (title === "Cadastrar Usuario") {
    createSolicitanteMutation
      .mutateAsync(dataFormatada)
      .then(() => {
        showSuccessToast("Solicitante cadastrado com sucesso");
        queryCliente.invalidateQueries([
          ReactQueryKeysEnum.SOLICITANTE_FINDALL,
        ]);
      })
      .catch(() => {
        showErrorToast("Erro ao cadastrar solicitante");
      });
    // }
    showSuccessToast("Usuario cadastrado com sucesso");
    showErrorToast("Erro ao cadastrar usuario");
    closeModal();
  };

  return (
    <Layout pageTitle="Solicitante">
      <div className="justify-centeralign-middle flex min-h-screen flex-col">
        <h1 className="mb-12 mt-6 text-center text-3xl font-semibold tracking-wide">
          Solicitante
        </h1>
        <div className="m-auto h-full w-full flex-grow overflow-auto">
          <div className="mr-4 flex justify-end">
            <button
              onClick={onAddSolicitanteClick}
              className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Adicionar Novo Solicitante
            </button>
            <Modal isOpen={openModal} title={title}>
              {openModalView ? (
                <ModalView data={dataViewSolicitante} onClick={closeModal} />
              ) : (
                <FormProvider {...formMethods}>
                  <ModalInput
                    isEdit={!(title === "Editar Solicitante")}
                    data={dataSolicitante}
                    onClick={closeModal}
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    // onChageCapacidade={(e) =>
                    //   setDataSala({
                    //     ...dataSala,
                    //     capacidade: Number(e.target.value),
                    //   })
                    // }
                    // onChageNome={(e) =>
                    //   setDataSala({
                    //     ...dataSala,
                    //     nome: e.target.value,
                    //   })
                    // }
                    // onChageTipo={(e) =>
                    //   setDataSala({
                    //     ...dataSala,
                    //     tipo: {
                    //       id: Number(e.target.value),
                    //       NomeDoTipo: "",
                    //     },
                    //   })
                    // }
                  />
                </FormProvider>
              )}
            </Modal>
          </div>
          <DataTable
            data={formattedData}
            page={page}
            total={solicitanteData?.TotalRecords}
            perPage={perPage}
            onNextPageClick={() => setPage((page) => page + 1)}
            onBackPageClick={() => setPage((page) => page - 1)}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onViewClick={onViewClick}
          />
        </div>
      </div>
    </Layout>
  );
}
