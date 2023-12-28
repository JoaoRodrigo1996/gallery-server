import { CreatePictureUseCase } from './create-picture-use-case'
import { InMemoryPicturesRepository } from 'test/repositories/in-memory-pictures-repository'

let inMemoryPicturesRepository: InMemoryPicturesRepository
let sut: CreatePictureUseCase

describe('Register user', () => {
  beforeEach(() => {
    inMemoryPicturesRepository = new InMemoryPicturesRepository()
    sut = new CreatePictureUseCase(inMemoryPicturesRepository)
  })

  it('should be able to register a new user', async () => {
    await sut.execute({
      pictureUrl: 'picture-name',
      userId: 'user-id-01',
    })

    expect(inMemoryPicturesRepository.items).toHaveLength(1)
  })
})
