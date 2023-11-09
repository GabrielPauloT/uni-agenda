import { ChangeEvent, FormEventHandler } from "react";

import { DataSalaType } from "../type";

export type ModalInputProps = {
  data: DataSalaType;
  onClick: () => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onChageNome: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onChageCapacidade: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  isEdit: boolean;
};
