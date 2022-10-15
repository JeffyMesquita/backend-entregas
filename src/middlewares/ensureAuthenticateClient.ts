import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const hashClient = process.env.HASH_CLIENT;

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      result: 'error',
      message: 'Token missing',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, `${hashClient}`) as IPayload;

    request.id_client = sub;

    return next();
  } catch (err) {
    return response.status(401).json({
      result: 'error',
      message: 'Invalid token',
    });
  }
}
