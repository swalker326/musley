import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./root";

export const IndexRoute = createRoute({
  path: "/",
  getParentRoute: () => RootRoute,
  component: () => (
    <div>
      <h1 className="text-3xl">Index</h1>
    </div>
  )
});
