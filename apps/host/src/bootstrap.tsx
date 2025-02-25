import React from "react";
import ReactDOM from "react-dom/client";
import { queryClient } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import { RouterWrapper } from "./RouterWrapper";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterWrapper />
          <ReactQueryDevtools initialIsOpen={false} position="left" />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
