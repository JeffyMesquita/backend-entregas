import { prisma } from '../../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const hashClient = process.env.HASH_CLIENT;

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
    const token = sign({ username }, `${hashClient}`, {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }
}
