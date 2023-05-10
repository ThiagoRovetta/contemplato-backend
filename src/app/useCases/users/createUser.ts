import { Request, Response } from 'express';
import { z } from 'zod';

import { hashPassword } from '../../utils/hashPassword';
import { prisma } from '../../utils/prisma';

export async function createUser(req: Request, res: Response) {
  try {
    const createUserBody = z.object({
      username: z.string(),
      password: z.string()
    });

    const result = createUserBody.safeParse(req.body);

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

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword
        }
      });

      return res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
