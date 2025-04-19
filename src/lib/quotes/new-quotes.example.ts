// only containing quotes that would be added to the database
import { CleanQuote } from "~/lib/types";

export const newQuotes: CleanQuote[] = [
  {
    id: 1,
    content:
      "Terlalu banyak berdoa tidak akan membuatmu lebih dekat dengan Tuhan.",
    datetime: "2023-10-01T00:00:00.000Z",
    doksli: "https://doksli.com/quotes/1",
  },
  {
    id: 2,
    content:
      "Kamu tidak perlu menjadi orang baik untuk mendapatkan kebaikan dari orang lain.",
    datetime: "2023-10-02T00:00:00.000Z",
    doksli: "https://doksli.com/quotes/2",
  },
  {
    id: 3,
    content:
      "Jangan pernah berharap pada orang lain, karena harapan itu hanya akan menyakiti dirimu sendiri.",
    datetime: "2023-10-03T00:00:00.000Z",
    doksli: "https://doksli.com/quotes/3",
  },
];
