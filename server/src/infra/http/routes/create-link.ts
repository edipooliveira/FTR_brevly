import { createLink } from '@/app/functions/create-link'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a link',
        tags: ['links'],
        body: z.object({
          originalUrl: z
            .string()
            .url()
            .regex(/^https?:\/\//i),
          shortUrl: z.string().regex(/^[a-z0-9-]{3,32}$/),
        }),
        response: {
          201: z
            .object({
              id: z.string(),
              originalUrl: z.string(),
              shortUrl: z.string(),
              accessCount: z.number(),
              createdAt: z.date(),
            })
            .describe('Link created'),
          400: z
            .object({ message: z.string(), issues: z.unknown().optional() })
            .describe('Invalid input'),
          409: z
            .object({ message: z.string() })
            .describe('Short URL already exists'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      const result = await createLink({ originalUrl, shortUrl })

      if (isRight(result)) {
        return reply.status(201).send(unwrapEither(result))
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'ShortUrlAlreadyExistsError':
          return reply.status(409).send({ message: error.message })
      }
    }
  )
}
