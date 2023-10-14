import { ChangeEvent, FormEventHandler } from "react";

import { FormUsuarioType } from "../type";

export type ModalInputProps = {
  data: FormUsuarioType;
  onClick: () => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onChageNome: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageEmail: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageSenha: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  isEdit: boolean;
};
