import { Input } from "@/components";

import { ModalInputProps } from "./type";

export function ModalInput({
  data,
  onClick,
  onSubmit,
  onChageNome,
  onChageEmail,
  onChageSenha,
  isEdit,
}: ModalInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Input
        type="text"
        title="Nome"
        placeholder="Nome"
        id="Nome"
        name="Nome"
        value={data.Nome || ""}
        onChange={onChageNome}
        required={isEdit}
      />
      <Input
        type="email"
        title="Email"
        placeholder="Email"
        id="Email"
        name="Email"
        value={data.Email || ""}
        onChange={onChageEmail}
        required={isEdit}
      />
      <Input
        type="Password"
        title="Senha"
        placeholder="Senha"
        id="Senha"
        name="Senha"
        value={data.Senha || ""}
        onChange={onChageSenha}
        required={isEdit}
      />
      <div className="flex justify-center gap-5">
        <button
          type="submit"
          className="mt-4 w-44 rounded bg-blue-500 px-4 py-2 text-white hover:bg-primary-100"
        >
          Enviar
        </button>
        <button
          type="reset"
          className="mt-4 w-44 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={onClick}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
