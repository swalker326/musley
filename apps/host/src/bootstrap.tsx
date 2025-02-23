import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient, router } from "./router";
import { Auth } from "./routes/root";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const auth: Auth = {
  status: "loggedOut",
  username: undefined,
  login: (username: string) => {
    auth.status = "loggedIn";
    auth.username = username;
  },
  logout: () => {
    auth.status = "loggedOut";
    auth.username = undefined;
  }
};

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ auth }} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
