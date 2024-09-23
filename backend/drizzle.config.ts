import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: "./db/main.db",
  },
  strict: true,
  verbose: true,
} satisfies Config;