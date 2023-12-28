import { FetchPicturesByUserIdUseCase } from './fetch-pictures-by-user-id-use-case'
import { InMemoryPicturesRepository } from 'test/repositories/in-memory-pictures-repository'

let inMemoryPicturesRepository: InMemoryPicturesRepository
let sut: FetchPicturesByUserIdUseCase

describe('Profile user', () => {
  beforeEach(() => {
    inMemoryPicturesRepository = new InMemoryPicturesRepository()
    sut = new FetchPicturesByUserIdUseCase(inMemoryPicturesRepository)
  })

  it('should be able to fetch all pictures by user', async () => {
    await inMemoryPicturesRepository.create({
      pictureUrl: 'picture-name-01',
      userId: 'user-id-01',
    })
    await inMemoryPicturesRepository.create({
      pictureUrl: 'picture-name-01',
      userId: 'user-id-01',
    })

    const { pictures } = await sut.execute({
      userId: 'user-id-01',
    })

    expect(pictures).toHaveLength(2)
  })
})
