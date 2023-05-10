import { Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { checkPassword } from '../../utils/hashPassword';
import { prisma } from '../../utils/prisma';

export async function authenticateUserUseCase(req: Request, res: Response) {
  try {
    const authenticationBody = z.object({
      username: z.string(),
      password: z.string()
    });

    const result = authenticationBody.safeParse(req.body);

    if (!result.success) {
      if (result.error.flatten().fieldErrors?.username) {
        return res.status(400).json({
          error: `username - ${result.error.flatten().fieldErrors?.username}`
        });
      }

      if (result.error.flatten().fieldErrors?.password) {
        return res.status(400).json({
          error: `password - ${result.error.flatten().fieldErrors?.password}`
        });
      }
    } else {
      const { username, password } = result.data;

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      const check = await checkPassword(password, user.password);

      if (!check) {
        return res.status(401).json({
          error: 'Wrong password'
        });
      }

      const secret = process.env.SECRET_KEY || 'secret_key';

      const token = jwt.sign({ id: user.id, username }, secret, {
        expiresIn: '1d',
      });

      res.status(200).json({
        token,
        user
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
