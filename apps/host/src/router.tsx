import { createRouter } from "@tanstack/react-router";
import { RootRoute, IndexRoute, EmailRemote } from "./routes";
import { CallbackRoute } from "./routes/callback";
import { QueryClient } from "@tanstack/react-query";
import { LoginRoute } from "./routes/login";

const routeTree = RootRoute.addChildren([IndexRoute, LoginRoute, EmailRemote, CallbackRoute]);

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: { queryClient, auth: undefined! },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
