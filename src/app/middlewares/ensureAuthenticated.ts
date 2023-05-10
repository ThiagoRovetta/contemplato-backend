import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  id: number;
  username: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret = process.env.SECRET_KEY || 'secret_key';

    const { id } = verify(token, secret) as IPayload;

    req.user = { id };

    next();
  } catch (err) {
    console.log('err', err);
    return res.sendStatus(401);
  }
}
