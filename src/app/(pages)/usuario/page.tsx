"use client";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { ReactQueryKeysEnum } from "@/@types";
import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { UsuarioQuery } from "@/service/hooks";
import {
  useCreateUsuario,
  useDeleteUsuario,
  useUpdateUsuario,
} from "@/service/hooks/UsuarioQuery";
import { useQueryClient } from "@tanstack/react-query";

import { ModalInput } from "./modalInput";
import { ModalView } from "./modalView";
import { DataUsuarioType, FormUsuarioType, ToastStateType } from "./type";

const PER_PAGE = 6;
const DEFAULT_USER_DATA = {
  Id: 0,
  Nome: "",
  Email: "",
  Senha: "",
};

export default function Usuario() {
  const queryCliente = useQueryClient();
  const [toast, setToast] = useState<ToastStateType>();
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const formMethods = useForm<FormUsuarioType>();
  const [userData, setUserData] = useState(DEFAULT_USER_DATA);

  const resetData = () => {
    setUserData(DEFAULT_USER_DATA);
  };

  const showSuccessToast = (message: string) => {
    setToast({ type: "success", message });
  };

  const showErrorToast = (message: string) => {
    setToast({ type: "error", message });
  };

  const closeModal = () => {
    formMethods.reset();
    resetData();
    setOpenModalView(false);
    setOpenModal(false);
  };
  const { data: usuarioData } = UsuarioQuery.useUsuario(page, PER_PAGE);

  const createUsuarioMutation = useCreateUsuario();

  const deleteUsuarioMutation = useDeleteUsuario();

  const updateUsuarioMutation = useUpdateUsuario();

  const onEditClick = useCallback((row: DataUsuarioType) => {
    setTitle("Editar Usuario");
    setUserData({
      Id: row.Id,
      Nome: row.Nome,
      Email: row.Email,
      Senha: "",
    });
    setOpenModal(true);
  }, []);

  const onDeleteClick = useCallback(
    (row: DataUsuarioType) => {
      deleteUsuarioMutation
        .mutateAsync(row.Id)
        .then(() => {
          showSuccessToast("Usuario deletado com sucesso");
          queryCliente.invalidateQueries([ReactQueryKeysEnum.USUARIO_FINDALL]);
        })
        .catch(() => {
          showErrorToast("Erro ao deletar usuario");
        });
    },
    [deleteUsuarioMutation, queryCliente],
  );

  const onViewClick = useCallback((row: DataUsuarioType) => {
    setTitle("Visualizar Usuario");
    setUserData({
      Id: row.Id,
      Nome: row.Nome,
      Email: row.Email,
      Senha: "",
    });
    setOpenModalView(true);
    setOpenModal(true);
  }, []);

  const onAddUserClick = useCallback(() => {
    setTitle("Cadastrar Usuario");
    setOpenModal(true);
  }, []);

  const formattedData = useMemo(
    () =>
      usuarioData?.Result.map((usuario) => ({
        ...usuario,
        CriadoEm: usuario?.CriadoEm
          ? new Date(usuario.CriadoEm).toLocaleDateString("pt-BR")
          : "",
        AtualizadoEm: usuario?.AtualizadoEm
          ? new Date(usuario.AtualizadoEm).toLocaleDateString("pt-BR")
          : "",
      })),
    [usuarioData],
  );

  const onSubmit: SubmitHandler<FormUsuarioType> = (data) => {
    if (title === "Editar Usuario") {
      updateUsuarioMutation
        .mutateAsync({
          userId: userData.Id,
          usuarioData: data,
        })
        .then(() => {
          showSuccessToast("Usuario atualizado com sucesso");
          queryCliente.invalidateQueries([ReactQueryKeysEnum.USUARIO_FINDALL]);
        })
        .catch(() => {
          showErrorToast("Erro ao atualizar usuario");
        });
    } else if (title === "Cadastrar Usuario") {
      createUsuarioMutation
        .mutateAsync(data)
        .then(() => {
          showSuccessToast("Usuario cadastrado com sucesso");
          queryCliente.invalidateQueries([ReactQueryKeysEnum.USUARIO_FINDALL]);
        })
        .catch(() => {
          showErrorToast("Erro ao cadastrar usuario");
        });
    }
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
                <ModalView data={userData} onClick={closeModal} />
              ) : (
                <FormProvider {...formMethods}>
                  <ModalInput
                    isEdit={!(title === "Editar Usuario")}
                    data={userData}
                    onClick={closeModal}
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    onChageNome={(e) =>
                      setUserData({
                        ...userData,
                        Nome: e.target.value,
                      })
                    }
                    onChageEmail={(e) =>
                      setUserData({
                        ...userData,
                        Email: e.target.value,
                      })
                    }
                    onChageSenha={(e) =>
                      setUserData({
                        ...userData,
                        Senha: e.target.value,
                      })
                    }
                  />
                </FormProvider>
              )}
            </Modal>
          </div>
          <DataTable
            data={formattedData}
            page={page}
            total={usuarioData?.TotalRecords}
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
