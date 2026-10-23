import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { LinkNotFoundError } from './errors/link-not-found-error'

const getLinkByShortUrlInput = z.object({
  shortUrl: z.string(),
})

type GetLinkByShortUrlInput = z.input<typeof getLinkByShortUrlInput>

type GetLinkByShortUrlOutput = {
  link: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }
}

export async function getLinkByShortUrl(
  input: GetLinkByShortUrlInput
): Promise<Either<LinkNotFoundError, GetLinkByShortUrlOutput>> {
  const { shortUrl } = getLinkByShortUrlInput.parse(input)

  const [link] = await db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))

  if (!link) {
    return makeLeft(new LinkNotFoundError())
  }

  return makeRight({ link })
}
