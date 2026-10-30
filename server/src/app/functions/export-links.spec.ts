import { randomUUID } from 'node:crypto'
import { exportLinks } from '@/app/functions/export-links'
import { isRight, unwrapEither } from '@/infra/shared/either'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it, vi } from 'vitest'

describe('export links', () => {
  it('should be able to export links', async () => {
    const chunks: Buffer[] = []

    vi.spyOn(upload, 'uploadFileToStorage').mockImplementationOnce(
      // reads while the CSV is generated, like the real upload: an unread
      // stream stalls the export once the test database grows
      async ({ contentStream }) => {
        for await (const chunk of contentStream) {
          chunks.push(chunk)
        }

        return {
          key: `${randomUUID()}.csv`,
          url: 'http://example.com/file.csv',
        }
      }
    )

    const link1 = await makeLink()
    const link2 = await makeLink()
    const link3 = await makeLink()
    const link4 = await makeLink()
    const link5 = await makeLink()

    const sut = await exportLinks()

    const csvAsArray = Buffer.concat(chunks)
      .toString('utf-8')
      .trim()
      .split('\n')
      .map(row => row.split(','))

    const [header, ...rows] = csvAsArray

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).reportUrl).toBe('http://example.com/file.csv')
    expect(header).toEqual([
      'ID',
      'URL original',
      'URL encurtada',
      'Contagem de acessos',
      'Data de criação',
    ])
    // other specs share the test database, so the CSV may contain more links
    expect(rows).toEqual(
      expect.arrayContaining(
        [link1, link2, link3, link4, link5].map(link => [
          link.id,
          link.originalUrl,
          link.shortUrl,
          String(link.accessCount),
          link.createdAt.toISOString(),
        ])
      )
    )
  })
})
