import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { UserAlreadyExistsError } from './error/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to register a new user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(inMemoryUsersRepository.items[0]).toHaveProperty('email')
  })

  it('should not be able to register a new user with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toEqual(new UserAlreadyExistsError())
  })
})
