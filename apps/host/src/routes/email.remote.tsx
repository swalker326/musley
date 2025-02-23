import { createRoute } from "@tanstack/react-router";
import { RemoteEntry } from "email/RemoteEntry";
import { RootRoute } from "./root";

export const EmailRemote = createRoute({
  getParentRoute: () => RootRoute,
  path: "/remote",
  component: () => <RemoteEntry />
});
