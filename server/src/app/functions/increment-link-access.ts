import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { LinkNotFoundError } from './errors/link-not-found-error'

const incrementLinkAccessInput = z.object({
  id: z.string(),
})

type IncrementLinkAccessInput = z.input<typeof incrementLinkAccessInput>

export async function incrementLinkAccess(
  input: IncrementLinkAccessInput
): Promise<Either<LinkNotFoundError, { accessCount: number }>> {
  const { id } = incrementLinkAccessInput.parse(input)

  const [updatedLink] = await db
    .update(schema.links)
    .set({ accessCount: sql`${schema.links.accessCount} + 1` })
    .where(eq(schema.links.id, id))
    .returning({ accessCount: schema.links.accessCount })

  if (!updatedLink) {
    return makeLeft(new LinkNotFoundError())
  }

  return makeRight({ accessCount: updatedLink.accessCount })
}
