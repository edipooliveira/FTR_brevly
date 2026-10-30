import { index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable(
  'links',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    originalUrl: text('original_url').notNull(),
    shortUrl: text('short_url').notNull().unique(),
    accessCount: integer('access_count').default(0).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  // Ascending on purpose: Postgres scans it backward for the DESC listing. A
  // `.desc()` index is created as NULLS LAST, which doesn't match ORDER BY DESC.
  table => [index('links_created_at_id_idx').on(table.createdAt, table.id)]
)
