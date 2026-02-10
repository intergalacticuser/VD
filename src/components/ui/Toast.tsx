"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
};

type ToastContextValue = {
  toast: (item: Omit<ToastItem, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((item: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, ...item }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toastItem) => toastItem.id !== id));
    }, 4500);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-6 top-6 z-[60] flex w-[min(90vw,360px)] flex-col gap-3">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border border-line bg-panel p-4 shadow-soft",
              item.variant === "success" && "border-success",
              item.variant === "error" && "border-danger"
            )}
          >
            <p className="text-sm font-semibold text-text">{item.title}</p>
            {item.description ? <p className="mt-1 text-xs text-muted">{item.description}</p> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
