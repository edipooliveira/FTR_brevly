import { randomUUID } from 'node:crypto'
import { LinkNotFoundError } from '@/app/functions/errors/link-not-found-error'
import { getLinkByShortUrl } from '@/app/functions/get-link-by-short-url'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'

describe('get link by short url', () => {
  it('should be able to get a link by its short url', async () => {
    const link = await makeLink()

    const sut = await getLinkByShortUrl({ shortUrl: link.shortUrl })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      link: expect.objectContaining({
        id: link.id,
        originalUrl: link.originalUrl,
        shortUrl: link.shortUrl,
      }),
    })
  })

  it('should not be able to get a non-existent link', async () => {
    const sut = await getLinkByShortUrl({ shortUrl: `missing-${randomUUID()}` })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError)
  })
})
