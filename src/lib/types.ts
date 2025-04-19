export type ENV = {
  FUFUFAFAPI_DB: D1Database;
};

export type CleanQuote = {
  id: number;
  content: string;
  datetime: string;
  doksli: string;
};

export type Quote = CleanQuote & {
  image_url?: string;
};

export type UploadthingResult = {
  name: string;
  url: string;
};
