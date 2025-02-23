import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("/api/*", cors());

app.get("/api/status", (c) => {
  return c.json({ data: "good" });
});

export default app;
