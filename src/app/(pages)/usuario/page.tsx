"use client";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { ToastProps } from "@/components/Toast/type";
import { UsuarioQuery } from "@/service/hooks";
import {
  useCreateUsuario,
  useDeleteUsuario,
  useUpdateUsuario,
} from "@/service/hooks/UsuarioQuery";

import { ModalInput } from "./modalInput";
import { ModalView } from "./modalView";
import { dataUsuario, formUsuario } from "./type";

const PER_PAGE = 6;
const DEFAULT_USER_DATA = {
  Id: 0,
  Nome: "",
  Email: "",
  Senha: "",
};

export default function Usuario() {
  const [toast, setToast] = useState<ToastProps>();
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const formMethods = useForm<formUsuario>();
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

  const onEditClick = useCallback((row: dataUsuario) => {
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
    (row: dataUsuario) => {
      deleteUsuarioMutation
        .mutateAsync(row.Id)
        .then(() => {
          showSuccessToast("Usuario deletado com sucesso");
        })
        .catch(() => {
          showErrorToast("Erro ao deletar usuario");
        });
    },
    [deleteUsuarioMutation],
  );

  const onViewClick = useCallback((row: dataUsuario) => {
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
        CreatedAt: usuario?.CreatedAt
          ? new Date(usuario.CreatedAt).toLocaleDateString("pt-BR")
          : "",
        UpdatedAt: usuario?.UpdatedAt
          ? new Date(usuario.UpdatedAt).toLocaleDateString("pt-BR")
          : "",
      })),
    [usuarioData],
  );

  const onSubmit: SubmitHandler<formUsuario> = (data) => {
    if (title === "Editar Usuario") {
      updateUsuarioMutation
        .mutateAsync({
          userId: userData.Id,
          usuarioData: data,
        })
        .then(() => {
          showSuccessToast("Usuario atualizado com sucesso");
        })
        .catch(() => {
          showErrorToast("Erro ao atualizar usuario");
        });
    } else if (title === "Cadastrar Usuario") {
      createUsuarioMutation
        .mutateAsync(data)
        .then(() => {
          showSuccessToast("Usuario cadastrado com sucesso");
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
                <ModalView
                  email={userData.Email}
                  nome={userData.Nome}
                  senha={userData.Senha}
                  onClick={closeModal}
                />
              ) : (
                <FormProvider {...formMethods}>
                  <ModalInput
                    isEdit={!(title === "Editar Usuario")}
                    nome={userData.Nome}
                    email={userData.Email}
                    senha={userData.Senha}
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
      {toast && <Toast type={toast.type} message={toast.message} />}
    </Layout>
  );
}
