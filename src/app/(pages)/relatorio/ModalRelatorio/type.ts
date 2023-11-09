import { ChangeEvent, FormEventHandler } from "react";

export type ModalRelatorioProps = {
  onClick: () => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onChageDataInicio: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageDataFim: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
};
