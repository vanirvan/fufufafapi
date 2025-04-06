import { WorkersKVStore } from "@hono-rate-limiter/cloudflare";
import { Hono, Next } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { cache } from "hono/cache";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

import { ENV } from "~/lib/types";

export const api = new Hono<{ Bindings: ENV }>();

api.use(prettyJSON()); // enable prettify JSON, with addin `?pretty` on query param

// enable CORS for all routes, but only GET method allowed
api.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET"],
  }),
);

// enable rate limiting for all routes
api.use((c, next: Next) =>
  rateLimiter<{ Bindings: ENV }>({
    windowMs: 5 * 60 * 1000, // 1 minutes
    limit: 300, // Limit each IP to 300 requests per `window`
    standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "", // Method to generate custom identifiers for clients.
    store: new WorkersKVStore({
      namespace: c.env.FUFUFAFAPI_RATE_LIMITER,
    }), // Here CACHE is your WorkersKV Binding.
  })(c, next),
);

api.get("/", (c) => {
  const MAX_QUOTE_ID = 699;
  const randomQuoteId = Math.floor(Math.random() * MAX_QUOTE_ID) + 1;

  return c.redirect(`/api/${randomQuoteId}`, 302);
});

api.get(
  "/:id",
  cache({
    cacheName: "api-id-cache",
    cacheControl: "max-age=86400", // 1 day cache
  }),
  async (c) => {
    const db = c.env.FUFUFAFAPI_DB;

    const id = c.req.param("id");

    const stmt = db.prepare("SELECT * FROM quotes WHERE id = ? LIMIT 1");

    try {
      const result = await stmt.bind(id).run();
      if (!result.results || result.results.length === 0) {
        return c.json({ error: "Quote not found" }, 404);
      }
      return c.json(result.results[0], 200);
    } catch (e) {
      console.log(e);
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);
