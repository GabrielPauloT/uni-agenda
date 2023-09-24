"use client";
import { Icons } from "@/components/Icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleLogin() {
    Cookie.set("auth_token", "testekjsandlkansdlkasdm");
    router.push("/calendar");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>
        <form onSubmit={handleLogin}>
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
              className="w-full rounded border px-3 py-2 shadow"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              id="password"
              className="w-full rounded border px-3 py-2 shadow"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
  );
}
