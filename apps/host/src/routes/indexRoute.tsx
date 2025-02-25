import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./root";
import { Button } from "@/components/ui/button";

export const IndexRoute = createRoute({
  path: "/",
  getParentRoute: () => RootRoute,
  component: () => (
    <div>
      <h1 className="text-3xl">Index</h1>
      <Button>Test</Button>
    </div>
  )
});
