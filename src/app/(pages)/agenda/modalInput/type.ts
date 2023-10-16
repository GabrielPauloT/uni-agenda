import { ChangeEvent, FormEventHandler } from "react";

import { AgendaEventType } from "@/@types/Components";

export type ModalAgendaInputType = {
  data: AgendaEventType | undefined;
  onClick: () => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onChageNome: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageTema: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageDataIni: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageDataFim: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageHoraIni: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageHoraFim: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageFalta: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  isEdit: boolean;
};
