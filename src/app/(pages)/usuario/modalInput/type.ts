import { ChangeEvent, FormEventHandler } from "react";

export type ModalInputProps = {
  nome: string;
  email: string;
  senha: string;
  onClick: () => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onChageNome: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageEmail: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageSenha: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  isEdit: boolean;
};
