import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./providers/AuthProvider";
import { router } from "./router";

export const RouterWrapper = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};
