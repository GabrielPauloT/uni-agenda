"use client";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { ReactQueryKeysEnum } from "@/@types";
import { Modal } from "@/components";
import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { Toast } from "@/components/Toast";
import { SalaQuery } from "@/service/hooks";
import { useQueryClient } from "@tanstack/react-query";

import { ToastStateType } from "../usuario/type";

import { ModalInput } from "./modalInput";
import { ModalView } from "./modalView";
import { DataSalaType, FormSalaType } from "./type";

const PER_PAGE = 10;
const DEFAULT_SALA_DATA = {
  id: 0,
  nome: "",
  tipo: 0,
  capacidade: 0,
  CriadoEm: new Date(),
  AtualizadoEm: new Date(),
};

export default function Sala() {
  const queryCliente = useQueryClient();
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState<ToastStateType>();
  const [dataSala, setDataSala] = useState<any>(DEFAULT_SALA_DATA);
  const [openModalView, setOpenModalView] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const formMethods = useForm<FormSalaType>();
  const [page, setPage] = useState(1);

  const { data: salaData } = SalaQuery.useSala(page, PER_PAGE);

  const createSalaMutation = SalaQuery.useCreateSala();
  const updateSalaMutation = SalaQuery.useUpdateSala();

  const resetData = () => {
    setDataSala(DEFAULT_SALA_DATA);
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ type, message });
  };

  const closeModal = () => {
    formMethods.reset();
    resetData();
    setOpenModalView(false);
    setOpenModal(false);
  };

  const onEditClick = useCallback((row: FormSalaType) => {
    setTitle("Editar Sala");
    setDataSala({
      id: row.id,
      nome: row.NomeDaSala,
      tipo: row.IdTipoDaSala,
      capacidade: row.Capacidade,
    });
    setOpenModal(true);
  }, []);

  const onDeleteClick = useCallback(
    (/* row: FormSalaType */) => {
      //   //   deleteUsuarioMutation
      //   //     .mutateAsync(row.Id)
      //   //     .then(() => {
      //   //       showSuccessToast("Usuario deletado com sucesso");
      //   //       queryCliente.invalidateQueries([ReactQueryKeysEnum.USUARIO_FINDALL]);
      //   //     })
      //   //     .catch(() => {
      //   //       showErrorToast("Erro ao deletar usuario");
      //   //     });
      //   // },
      //   // [deleteUsuarioMutation, queryCliente],
    },
    [],
  );

  const onViewClick = useCallback((row: DataSalaType) => {
    setTitle("Visualizar Sala");
    setDataSala({
      id: row.id,
      nome: row.nome,
      tipo: row.tipo,
      capacidade: row.capacidade,
      CriadoEm: row.CriadoEm,
      AtualizadoEm: row.AtualizadoEm,
    });
    setOpenModalView(true);
    setOpenModal(true);
  }, []);

  const onAddSalaClick = () => {
    setTitle("Adicionar Nova Sala");
    setOpenModal(true);
  };

  const formattedData = useMemo(
    () =>
      salaData?.Result.map((sala) => ({
        ...sala,
        CriadoEm: sala?.CriadoEm
          ? new Date(sala.CriadoEm).toLocaleDateString("pt-BR")
          : "",
        AtualizadoEm: sala?.AtualizadoEm
          ? new Date(sala.AtualizadoEm).toLocaleDateString("pt-BR")
          : "",
        tipo: sala?.tipo?.nomedotipo || "",
      })),
    [salaData],
  );

  const onSubmit: SubmitHandler<FormSalaType> = (data) => {
    const dataFormarted = {
      ...data,
      IdTipoDaSala: Number(data.IdTipoDaSala),
      Capacidade: Number(data.Capacidade),
    };
    if (title === "Editar Sala") {
      updateSalaMutation
        .mutateAsync({
          salaId: dataSala.id,
          salaData: dataFormarted,
        })
        .then(() => {
          showToast("Sala atualizada com sucesso", "success");
          queryCliente.invalidateQueries([ReactQueryKeysEnum.SALA_FINDALL]);
        })
        .catch(() => {
          showToast("Erro ao atualizar sala", "error");
        });
    } else if (title === "Cadastrar Sala") {
      createSalaMutation
        .mutateAsync(dataFormarted)
        .then(() => {
          showToast("Sala cadastrada com sucesso", "success");
          queryCliente.invalidateQueries([ReactQueryKeysEnum.SALA_FINDALL]);
        })
        .catch(() => {
          showToast("Erro ao cadastrar sala", "error");
        });
    }
    showToast("Sala cadastrada com sucesso", "success");
    showToast("Erro ao cadastrar sala", "error");
    closeModal();
  };

  return (
    <Layout pageTitle="Sala">
      <div className="justify-centeralign-middle flex min-h-screen flex-col overflow-hidden">
        <h1 className="mb-12 mt-6 text-center text-3xl font-semibold tracking-wide">
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
            <Modal isOpen={openModal} title={title}>
              {openModalView ? (
                <ModalView data={dataSala} onClick={closeModal} />
              ) : (
                <FormProvider {...formMethods}>
                  <ModalInput
                    isEdit={!(title === "Editar Sala")}
                    data={dataSala}
                    onClick={closeModal}
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    onChageCapacidade={(e) =>
                      setDataSala({
                        ...dataSala,
                        capacidade: Number(e.target.value),
                      })
                    }
                    onChageNome={(e) =>
                      setDataSala({
                        ...dataSala,
                        nome: e.target.value,
                      })
                    }
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
            total={salaData?.TotalRecords}
            perPage={PER_PAGE}
            onNextPageClick={() => setPage((page) => page + 1)}
            onBackPageClick={() => setPage((page) => page - 1)}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onViewClick={onViewClick}
          />
        </div>
      </div>
      {toast && (
        <Toast type={toast.type} message={toast.message} isClose={setToast} />
      )}
    </Layout>
  );
}
