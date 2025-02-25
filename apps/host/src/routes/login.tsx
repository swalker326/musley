import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./root";
import { useAuth } from "../providers/AuthProvider";

export const LoginRoute = createRoute({
  path: "/login",
  getParentRoute: () => RootRoute,
  component: () => {
    const { login } = useAuth();
    return login();
  }
});
