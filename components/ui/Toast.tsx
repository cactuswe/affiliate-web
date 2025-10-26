"use client";
import { createContext, useContext, useState } from 'react';

type Toast = { id: string; message: string };

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  function push(message: string) {
    const t = { id: String(Date.now()), message };
    setToasts((s) => [t, ...s]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== t.id)), 4000);
  }
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="bg-black text-white px-4 py-2 rounded-md">{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
