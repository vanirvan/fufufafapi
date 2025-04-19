import { Hono } from "hono";

import { newQuotes } from "~/lib/quotes/new-quotes";
import { images } from "~/lib/quotes/uploadthing-files";
import { ENV } from "~/lib/types";

export const update = new Hono<{ Bindings: ENV }>();

// This routes only available and accessible only for updating fufufafa's quotes
// and must be disabled when the thing is finished
// you don't want to expose this to the public, dont you?
update.post("/", async (c) => {
  const isEnabled = false; // set to true if you want to enable this route

  if (!isEnabled) {
    return c.json({ error: "Unavailable for a moment, sorry" }, 403);
  }
  const db = c.env.FUFUFAFAPI_DB;

  // get all quotes from file
  // get all data from uploadthing
  // combine them
  const quotes = newQuotes.map((nq) => {
    const findImageWithTheSameId = images.find(
      (img) => img.name === nq.id.toString() + ".jpg",
    );

    return {
      ...nq,
      image_url: findImageWithTheSameId?.url,
    };
  });

  const stmt = db.prepare(
    "INSERT INTO quotes (id, content, datetime, doksli, image_url) VALUES (?, ?, ?, ?, ?)",
  );

  // maximum column can cloudflare D1 handle
  // 100 means if there are 5 columns, only 100 / 5 row can be inserted in each batch
  const MAX_COLUMN_LENGTH = 100; // default by cloudflare D1, no you can't change this.
  const MAX_ROW_COLUMN = 5;
  const BATCH_SIZE = MAX_COLUMN_LENGTH / MAX_ROW_COLUMN; // 20 rows per batch

  console.log(`Inserting ${quotes.length} quotes`);
  for (let i = 0; i < quotes.length; i += BATCH_SIZE) {
    console.log(`Inserting batch ${i + 1} ~ ${i + BATCH_SIZE}`);
    await db.batch([
      ...quotes
        .slice(i, i + BATCH_SIZE)
        .map((quote) =>
          stmt.bind(
            quote.id,
            quote.content,
            quote.datetime,
            quote.doksli,
            quote.image_url,
          ),
        ),
    ]);
  }
  console.log(`Finished inserting quotes`);

  return c.json({
    total: quotes.length,
  });
});
