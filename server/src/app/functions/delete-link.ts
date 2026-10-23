import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { LinkNotFoundError } from './errors/link-not-found-error'

const deleteLinkInput = z.object({
  id: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<LinkNotFoundError, null>> {
  const { id } = deleteLinkInput.parse(input)

  const [deletedLink] = await db
    .delete(schema.links)
    .where(eq(schema.links.id, id))
    .returning({ id: schema.links.id })

  if (!deletedLink) {
    return makeLeft(new LinkNotFoundError())
  }

  return makeRight(null)
}
