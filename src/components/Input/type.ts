export type InputProps = {
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string | undefined;
  id: string;
  type: string;
  title: string | number;
  name: string;
  required?: boolean;
};
