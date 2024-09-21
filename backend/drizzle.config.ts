import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite", // SQLite dialect
  schema: "./src/**/schema.ts", // Path to your schema definition
  out: "./migrations", // Where to output migrations
  dbCredentials: {
    url: "./mydatabase.db", // Path to the SQLite file
  },
  strict: true,
  verbose: true,
} satisfies Config;