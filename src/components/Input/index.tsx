import { useFormContext } from "react-hook-form";

import { InputProps } from "./type";

export function Input({
  value,
  onChange,
  placeholder,
  id,
  type,
  title,
  name,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {title}:
      </label>
      <input
        {...register(name, {
          required: true,
          value: value,
          onChange: onChange,
        })}
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}
