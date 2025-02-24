import { QueryClient, useQuery } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Header } from "../components/header";
import { AuthContextType } from "../providers/AuthProvider";
import { NavBar } from "../components/navbar";

export const RootRoute = createRootRouteWithContext<{
  auth: AuthContextType;
  queryClient: QueryClient;
}>()({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({ queryKey: ["root"] });
  },
  component: () => {
    const { data } = useQuery({
      queryKey: ["root"],
      queryFn: async () => {
        const response = await fetch("http://localhost:8787/api/status", {
          method: "GET"
        });
        return await response.json();
      }
    });
    console.log(data);
    return (
      <div>
        <div className="flex items-center justify-between bg-gray-800">
          <NavBar />
          <div className="p-4">
            <Header />
          </div>
        </div>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    );
  }
});
