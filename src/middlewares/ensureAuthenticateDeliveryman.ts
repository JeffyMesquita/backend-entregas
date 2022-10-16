import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const hashDelivery = process.env.HASH_DELIVERYMAN;

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
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
    const { sub } = verify(token, `${hashDelivery}`) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (err) {
    return response.status(401).json({
      result: 'error',
      message: 'Invalid token',
    });
  }
}
