import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateCliente {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateCliente) {
    // Validar se o client existe
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        }
      },
    });

    if (clientExist) {
      throw new Error('client already exists');
    }

    // Criptografar a senha
    const hashedPassword = await hash(password, 10);

    // Salvar o client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return client;
  }
}
