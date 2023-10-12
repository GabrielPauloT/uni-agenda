import { ChangeEventHandler } from "react";
import { FieldErrors } from "react-hook-form";

export type InputProps = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  id: string;
  type: string;
  title: string;
  name: string;
};
