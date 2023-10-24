import { api } from "../api";
import { FaltaType } from "../types";

export function createFalta(faltaData: FaltaType) {
  return api.post("/faltas", faltaData);
}
