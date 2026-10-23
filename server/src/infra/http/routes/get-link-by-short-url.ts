import { getLinkByShortUrl } from '@/app/functions/get-link-by-short-url'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinkByShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/:shortUrl',
    {
      schema: {
        summary: 'Get a link by its short URL',
        tags: ['links'],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            link: z.object({
              id: z.string(),
              originalUrl: z.string(),
              shortUrl: z.string(),
              accessCount: z.number(),
              createdAt: z.date(),
            }),
          }),
          404: z.object({ message: z.string() }).describe('Link not found'),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      const result = await getLinkByShortUrl({ shortUrl })

      if (isRight(result)) {
        const { link } = unwrapEither(result)

        return reply.status(200).send({ link })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'LinkNotFoundError':
          return reply.status(404).send({ message: error.message })
      }
    }
  )
}
