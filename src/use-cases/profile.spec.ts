import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { ProfileUseCase } from './profile'
import { hash } from 'bcryptjs'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: ProfileUseCase

describe('Profile user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new ProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 9),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
