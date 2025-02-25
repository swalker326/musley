import { Client, createClient } from "@openauthjs/openauth/client";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { subjects } from "subjects/index";
import type { MiddlewareHandler } from "hono";

type Bindings = {
  client: Client;
};

const authMiddleware: MiddlewareHandler<{ Bindings: Bindings }> = async (
  c,
  next
) => {
  const header = c.req.header("Authorization");
  if (!header) {
    return c.json({ data: "No auth detected" }, 401);
  }
  const token = header.split(" ")[1];
  const { err } = await c.env.client.verify(subjects, token);
  if (err) {
    console.log("Error in Auth Middleware", err);
    return c.json({ data: "Auth failed" }, 401);
  }
  await next();
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("/*", cors());

// Public routes
app.get("/health", (c) => c.json({ status: "ok" }, 200));

// Protected routes
app.use("/api/*", authMiddleware);
app.get("/api/status", (c) => {
  return c.json({ data: "good" }, 200);
});
app.get("/api/user", (c) => {
  return c.json({ data: { name: "shane" } }, 200);
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const client = createClient({
      clientID: "musley-api",
      issuer: "http://localhost:8080"
    });

    return app.fetch(request, { ...env, client }, ctx);
  }
};
