import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./root";
import { useEffect } from "react";

export const CallbackRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/callback",
  component: () => {
    useEffect(() => {
      const hash = new URLSearchParams(location.search.slice(1));
      const code = hash.get("code");
      const state = hash.get("state");

      if (code && state) {
        const challenge = JSON.parse(sessionStorage.getItem("challenge")!);
        if (state === challenge.state && challenge.verifier) {
          // The auth callback will be handled by AuthProvider
          return;
        }
      }

      window.location.replace("/");
    }, []);

    return <div>Processing authentication...</div>;
  }
});