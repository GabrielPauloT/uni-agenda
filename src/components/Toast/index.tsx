// src/components/Toast.js
import React, { useEffect, useState } from "react";

import { ToastProps } from "./type";

import { Icons } from "..";

export const Toast = ({ message, type }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Desaparecer depois de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  // Estilos aplicados usando Tailwind CSS
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex h-12 min-w-[250px] max-w-[400px] items-center justify-center gap-2 rounded-lg p-2 text-white shadow-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {type === "success" ? (
        <Icons name="BsPatchCheckFill" className="bg-green-500" />
      ) : (
        <Icons name="MdReportGmailerrorred" className="bg-red-500" />
      )}
      <p className="text-sm">{message}</p>
    </div>
  );
};
