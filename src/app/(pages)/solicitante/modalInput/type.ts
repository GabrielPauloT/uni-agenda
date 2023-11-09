import { ChangeEvent, FormEventHandler } from "react";

import { FormSolicitanteType } from "../type";

export type ModalInputProps = {
  data: FormSolicitanteType;
  onClick: () => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onChageNome: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageCapacidade: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  isEdit: boolean;
};
