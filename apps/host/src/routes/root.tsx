import { QueryClient, useQuery } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  redirect
} from "@tanstack/react-router";
import { Header } from "../components/header";
import { AuthContextType, useAuth } from "../providers/AuthProvider";
import { NavBar } from "../components/navbar";

export const RootRoute = createRootRouteWithContext<{
  auth: AuthContextType;
  queryClient: QueryClient;
}>()({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({ queryKey: ["root"] });
  },
  component: () => {
    const { getToken } = useAuth();
    const { data } = useQuery({
      queryKey: ["root"],
      queryFn: async () => {
        const token = await getToken();
        if (!token) return redirect({ to: "/login" });
        const response = await fetch("http://localhost:8787/api/user", {
          headers: {
            Authorization: `Bearer ${token} `
          }
        });
        return await response.json();
      }
    });
    return (
      <div>
        <div className="flex items-center justify-between bg-gray-300">
          <NavBar />
          <Header />
        </div>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    );
  }
});
