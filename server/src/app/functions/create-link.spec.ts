import { randomUUID } from 'node:crypto'
import { createLink } from '@/app/functions/create-link'
import { ShortUrlAlreadyExistsError } from '@/app/functions/errors/short-url-already-exists-error'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

describe('create link', () => {
  it('should be able to create a link', async () => {
    const shortUrl = `link-${randomUUID().slice(0, 8)}`

    const sut = await createLink({
      originalUrl: 'https://example.com',
      shortUrl,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual(
      expect.objectContaining({
        originalUrl: 'https://example.com',
        shortUrl,
        accessCount: 0,
      })
    )

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl))

    expect(result).toHaveLength(1)
  })

  it('should not be able to create a link with an invalid short url', async () => {
    await expect(
      createLink({
        originalUrl: 'https://example.com',
        shortUrl: 'Invalid Short URL!',
      })
    ).rejects.toBeInstanceOf(ZodError)
  })

  it('should not be able to create a link with a duplicated short url', async () => {
    const link = await makeLink()

    const sut = await createLink({
      originalUrl: 'https://example.com',
      shortUrl: link.shortUrl,
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(ShortUrlAlreadyExistsError)
  })
})
