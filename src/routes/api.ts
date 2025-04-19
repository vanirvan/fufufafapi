import { Hono } from "hono";
import { cache } from "hono/cache";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

import { ENV } from "~/lib/types";

export const api = new Hono<{ Bindings: ENV }>();

api.use(prettyJSON()); // enable prettify JSON, with adding `?pretty` on query param

// enable CORS for all routes, but only GET method allowed
api.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET"],
  }),
);

api.get(
  "/",
  cache({
    cacheName: "api-id-cache",
    cacheControl: "max-age=86400", // 1 day cache
  }),
  async (c) => {
    const db = c.env.FUFUFAFAPI_DB;

    // get the ?content query param from the request
    const contentParam = c.req.query("content");

    if (contentParam) {
      // if ?content is present, search for the quote in the database
      const content = contentParam ? decodeURIComponent(contentParam) : null;
      const stmt = db.prepare("SELECT * FROM quotes WHERE content LIKE ?");

      try {
        const result = await stmt.bind(`%${content}%`).all();
        if (!result.results || result.results.length === 0) {
          return c.json({ error: "Quote not found" }, 404);
        }
        return c.json(result.results, 200);
      } catch (e) {
        console.log(e);
        return c.json({ error: "Internal server error" }, 500);
      }
    }

    // get all quotes from the database if no ?content is present
    const stmt = db.prepare("SELECT * FROM quotes");
    try {
      const quotes = await stmt.all();
      if (!quotes.results || quotes.results.length === 0) {
        return c.json({ error: "No quotes found" }, 404);
      }
      return c.json(quotes.results, 200);
    } catch (e) {
      console.log(e);
      return c.json({ error: "Internal server error" }, 500);
    }
  },
);

// random api endpoint will use this instead of /api/
api.get("/random", (c) => {
  const MAX_QUOTE_ID = 1314;
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
