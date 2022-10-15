import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Receber username, password

    // Verificar se username está cadastrado
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new Error('Username or password incorrect');
    }

    // Verificar se a senha corresponde ao username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Username or password incorrect');
    }

    // Gerar o token
    const token = sign({ username }, 'd0d615fcb528b3d881006b1f4c7e38db', {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }
}
