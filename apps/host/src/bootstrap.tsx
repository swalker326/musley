import React from "react";
import ReactDOM from "react-dom/client";
import { queryClient } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import { RouterWrapper } from "./RouterWrapper";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterWrapper />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
