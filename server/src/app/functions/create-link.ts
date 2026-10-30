import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { z } from 'zod'
import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists-error'

const createLinkInput = z.object({
  originalUrl: z
    .string()
    .url()
    .regex(/^https?:\/\//i),
  shortUrl: z.string().regex(/^[a-z0-9-]{3,32}$/),
})

type CreateLinkInput = z.input<typeof createLinkInput>

type CreateLinkOutput = {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
  createdAt: Date
}

export async function createLink(
  input: CreateLinkInput
): Promise<Either<ShortUrlAlreadyExistsError, CreateLinkOutput>> {
  const { originalUrl, shortUrl } = createLinkInput.parse(input)

  const [link] = await db
    .insert(schema.links)
    .values({ originalUrl, shortUrl })
    .onConflictDoNothing({ target: schema.links.shortUrl })
    .returning()

  if (!link) {
    return makeLeft(new ShortUrlAlreadyExistsError())
  }

  return makeRight(link)
}
