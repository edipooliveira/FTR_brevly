import { LinkNotFoundError } from '@/app/functions/errors/link-not-found-error'
import { incrementLinkAccess } from '@/app/functions/increment-link-access'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { eq } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'
import { describe, expect, it } from 'vitest'

describe('increment link access', () => {
  it('should be able to increment the access count of a link', async () => {
    const link = await makeLink()

    let sut = await incrementLinkAccess({ id: link.id })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({ accessCount: 1 })

    sut = await incrementLinkAccess({ id: link.id })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({ accessCount: 2 })

    const [result] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id))

    expect(result.accessCount).toEqual(2)
  })

  it('should not be able to increment the access count of a non-existent link', async () => {
    const sut = await incrementLinkAccess({ id: uuidv7() })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError)
  })
})
