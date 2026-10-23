import { deleteLink } from '@/app/functions/delete-link'
import { LinkNotFoundError } from '@/app/functions/errors/link-not-found-error'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { eq } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'
import { describe, expect, it } from 'vitest'

describe('delete link', () => {
  it('should be able to delete a link', async () => {
    const link = await makeLink()

    const sut = await deleteLink({ id: link.id })

    expect(isRight(sut)).toBe(true)

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id))

    expect(result).toHaveLength(0)
  })

  it('should not be able to delete a non-existent link', async () => {
    const sut = await deleteLink({ id: uuidv7() })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError)
  })
})
