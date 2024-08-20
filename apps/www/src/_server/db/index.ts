// import "server-only";
import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"

import { DB } from "@/types/db"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const dialect = new PostgresDialect({
  pool,
})

export const db = new Kysely<DB>({
  dialect,
  // log: ["query", "error"],
})
