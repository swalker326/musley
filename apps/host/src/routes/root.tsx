import { QueryClient, useQuery } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet
} from "@tanstack/react-router";

export type Auth = {
  login: (username: string) => void;
  logout: () => void;
  status: "loggedOut" | "loggedIn";
  username?: string;
};

export const RootRoute = createRootRouteWithContext<{
  auth: Auth;
  queryClient: QueryClient;
}>()({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({ queryKey: ["root"] });
  },
  component: () => {
    const { data } = useQuery({
      queryKey: ["root"],
      queryFn: async () => {
        const response = await fetch("http://localhost:8787/api/status", { method: "GET" });
        return await response.json();
      }
    });
    console.log(data);
    return (
      <div>
        <nav>
          <ul className="flex gap-1 text-gray-800">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/remote">Remote</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    );
  }
});
