import { getLinks } from '@/app/functions/get-links'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'

describe('get links', () => {
  it('should be able to get the links', async () => {
    const link1 = await makeLink()
    const link2 = await makeLink()
    const link3 = await makeLink()
    const link4 = await makeLink()
    const link5 = await makeLink()

    const createdIds = [link1.id, link2.id, link3.id, link4.id, link5.id]

    const sut = await getLinks()

    expect(isRight(sut)).toBe(true)

    // other specs share the test database, so only the links created here are checked
    const links = unwrapEither(sut).links.filter(link =>
      createdIds.includes(link.id)
    )

    expect(links).toEqual([
      expect.objectContaining({ id: link5.id }),
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ])
  })

  it('should be able to get the links sorted by creation date', async () => {
    const oneDay = 24 * 60 * 60 * 1000

    const link1 = await makeLink({
      createdAt: new Date(Date.now() - 2 * oneDay),
    })
    const link2 = await makeLink({ createdAt: new Date() })
    const link3 = await makeLink({
      createdAt: new Date(Date.now() - oneDay),
    })

    const createdIds = [link1.id, link2.id, link3.id]

    const sut = await getLinks()

    expect(isRight(sut)).toBe(true)

    const links = unwrapEither(sut).links.filter(link =>
      createdIds.includes(link.id)
    )

    expect(links).toEqual([
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link1.id }),
    ])
  })
})
