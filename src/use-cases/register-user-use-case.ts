import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from './error/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHashed = await hash(password, 9)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    })

    return { user }
  }
}
