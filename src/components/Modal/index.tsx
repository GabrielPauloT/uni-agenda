import { CommonModalProps } from "./types";

export function Modal({ isOpen, title, children }: CommonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="z-50 w-500 rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-5 rounded-t border-b border-solid border-gray-300 p-5 text-center">
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
