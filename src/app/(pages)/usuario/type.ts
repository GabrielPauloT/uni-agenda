export type FormUsuarioType = {
  Id?: number;
  Nome: string;
  Email: string;
  Senha: string;
};

export type DataUsuarioType = {
  Id: number;
  Nome: string;
  Email: string;
  Senha: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export type ToastStateType = {
  message: string;
  type: "success" | "error";
};
