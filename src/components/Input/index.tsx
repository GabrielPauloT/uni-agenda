import { InputProps } from "./type";

export function Input({
  value,
  onChange,
  placeholder,
  id,
  type,
  title,
  name,
  required,
  register,
  erros,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {title}
      </label>
      <input
        {...register(name, {
          required: required,
          value: value,
          onChange: onChange,
        })}
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
      />
      {erros[name] && (
        <span className="text-red-500">Este campo é obrigatório</span>
      )}
    </div>
  );
}
