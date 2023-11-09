import { api } from "..";

export function relatorioFalta(dataInicio: string, dataFim: string) {
  return api
    .get(`/pdf/dataInicio/${dataInicio}/dataFim/${dataFim}`, {
      responseType: "blob",
    })
    .then((response) => {
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = document.createElement("a");
      fileURL.href = URL.createObjectURL(file);
      fileURL.setAttribute("download", "relatorio.pdf");
      document.body.appendChild(fileURL);
      fileURL.click();
    });
}
