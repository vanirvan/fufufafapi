import { Child } from "hono/jsx";

import Navbar from "~/views/components/navbar";

export default function MainLayout({ children }: { children: Child }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/assets/index.css" />
        <title>Fufufafapi</title>
      </head>
      <body class="font-geist">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
