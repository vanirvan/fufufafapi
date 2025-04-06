import { Hono } from "hono";
import { logger } from "hono/logger";

import { api } from "~/routes/api";

import { ENV } from "~/lib/types";

const app = new Hono<{ Bindings: ENV }>();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", api);

export default app;
