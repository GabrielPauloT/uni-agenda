"use client";
import { useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import moment from "moment-timezone";

import { DataTable, Modal } from "@/components";
import { Layout } from "@/components/Layout";
import { relatorioFalta } from "@/service/requests/RelatorioRequest";

import { ModalRelatorio } from "./ModalRelatorio";
import { RelatorioModalType } from "./type";

export default function Relatorio() {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const formMethods = useForm<RelatorioModalType>();
  const [data, setData] = useState<RelatorioModalType>({
    dataInicio: "",
    dataFim: "",
  });
  const relatorio = useMemo(
    () => [
      {
        id: 1,
        nome: "Relatorio de faltas",
      },
    ],
    [],
  );

  const onRelatorioClick = () => {
    setOpenModal(true);
  };

  function convertData(inputData: string) {
    const date = new Date(inputData);
    const dateFormatedLocale = moment(date).tz("America/Sao_Paulo").utc();
    date.setDate(date.getDate() + 2);
    const dataFormatada = dateFormatedLocale.toISOString();

    return dataFormatada;
  }

  const onSubmit: SubmitHandler<RelatorioModalType> = (data) => {
    setData(data);
    const dataInicio = convertData(data.dataInicio);
    const dataFim = convertData(data.dataFim);
    relatorioFalta(dataInicio, dataFim);
    console.log(convertData(data.dataFim));
    setOpenModal(!openModal);
  };

  return (
    <Layout pageTitle="Relatório">
      <div className="justify-centeralign-middle flex min-h-screen flex-col">
        <h1 className="mb-12 mt-6 text-center text-3xl font-semibold tracking-wide">
          Relatório
        </h1>
        <Modal isOpen={openModal} title={"Gerador de Relatorio"}>
          <FormProvider {...formMethods}>
            <ModalRelatorio
              onSubmit={formMethods.handleSubmit(onSubmit)}
              onChageDataInicio={(e) =>
                setData({ ...data, dataInicio: e.target.value })
              }
              onChageDataFim={(e) =>
                setData({ ...data, dataFim: e.target.value })
              }
              onClick={() => setOpenModal(!openModal)}
            />
          </FormProvider>
        </Modal>
        <DataTable
          data={relatorio}
          page={page}
          total={10}
          perPage={100}
          onNextPageClick={() => setPage((page) => page + 1)}
          onBackPageClick={() => setPage((page) => page - 1)}
          onRelatorioClick={onRelatorioClick}
        />
      </div>
    </Layout>
  );
}
