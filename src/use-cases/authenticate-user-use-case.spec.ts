import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { AuthenticateUserUseCase } from './authenticate-user-use-case'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to authentiate an user', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 9),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authentiate an user with wrong e-mail', async () => {
    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toEqual(new InvalidCredentialsError())
  })

  it('should not be able to authentiate an user with wrong e-mail', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 9),
    })

    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: '321321',
      }),
    ).rejects.toEqual(new InvalidCredentialsError())
  })
})
