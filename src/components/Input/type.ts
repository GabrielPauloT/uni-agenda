import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type InputProps = {
  value: string | number | boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string | undefined;
  id: string;
  type: string;
  title: string | number;
  name: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  erros: FieldErrors<FieldValues>;
};
