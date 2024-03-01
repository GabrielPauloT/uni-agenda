import { ChangeEvent, Dispatch, FormEventHandler, SetStateAction } from "react";

import { FormSolicitanteType } from "../type";

export type ModalInputProps = {
  data: FormSolicitanteType;
  onClick: () => void;
  setDataSolicitante: Dispatch<SetStateAction<FormSolicitanteType>>;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onChageNome: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageEmail: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageTipo: ((e: ChangeEvent<HTMLSelectElement>) => void) | undefined;
  isEdit: boolean;
};
