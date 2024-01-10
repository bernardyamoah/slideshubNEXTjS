"use client";

import { Toaster } from "sonner";

export const ToastProvider = () => {
  return <Toaster   expand={false}
              position="top-center"
              richColors
              closeButton={true}/>
};
