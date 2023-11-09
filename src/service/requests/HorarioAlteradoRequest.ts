import { api } from "..";

import { HorarioAlteradoType } from "../types/HorarioAlterado";

export function createHorarioAlterado(horarioAlterado: HorarioAlteradoType) {
  return api.post("/horariosalterados", horarioAlterado);
}
