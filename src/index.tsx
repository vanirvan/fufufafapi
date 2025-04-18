import { Hono } from "hono";
import { cache } from "hono/cache";
import { jsxRenderer } from "hono/jsx-renderer";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

import { api } from "~/routes/api";

import { ENV } from "~/lib/types";

import MainLayout from "~/views/layouts/MainLayout";
import HomePage from "~/views/page";

const app = new Hono<{ Bindings: ENV }>();

app.use(logger());
app.use(trimTrailingSlash());

app.get(
  "*",
  jsxRenderer(({ children }) => {
    return <MainLayout>{children}</MainLayout>;
  }),
);

app.get(
  "/",
  cache({
    cacheName: "app-id-cache",
    cacheControl: "max-age=86400", // 1 day cache
  }),
  (c) => {
    return c.render(<HomePage />);
  },
);

app.route("/api", api);

export default app;
