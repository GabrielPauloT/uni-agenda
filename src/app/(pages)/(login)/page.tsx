/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { Icons } from "@/components";
import { Toast } from "@/components/Toast";
import { useAuth } from "@/service/hooks/AuthQuery";
import { authRequestType, authResponseType } from "@/service/types/auth";

export default function Login() {
  const authMutation = useAuth();
  const [toast, setToast] = useState<
    { type: "success" | "error"; message: string } | undefined
  >();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ type, message });
  };

  useEffect(() => {
    Cookies.remove("auth_token");
  }, []);

  const router = useRouter();

  const onSubmit = (data: authRequestType) => {
    authMutation
      .mutateAsync(data)
      .then((response) => {
        const responseData: authResponseType = response.data;

        if (responseData.statusCode !== 200) {
          showToast(responseData.message, "error");
        } else {
          showToast(responseData.message, "success");
          Cookies.set("auth_token", responseData.token, { expires: 1 });
          router.push("/agenda");
        }
      })
      .catch((error) => {
        const erroData = error.response.data;
        showToast(erroData.message, "error");
      });
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="no-wrap flex gap-2 font-semibold text-gray-600"
              >
                <Icons name="MdMailOutline" />
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="w-full rounded border px-3 py-2 shadow"
                placeholder="example@unipam.edu.br"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="no-wrap flex gap-2 font-semibold text-gray-600"
              >
                <Icons name="BsKey" />
                Senha:
              </label>
              <input
                {...register("senha", { required: true })}
                type="password"
                id="password"
                className="w-full rounded border px-3 py-2 shadow"
                placeholder="Sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-primary-100"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      {toast && (
        <Toast type={toast.type} message={toast.message} isClose={setToast} />
      )}
    </>
  );
}
