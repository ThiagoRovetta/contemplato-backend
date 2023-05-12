import { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../utils/prisma';

export async function updateTaskStatus(req: Request, res: Response) {
  try {
    const taskId = Number(req.params.id);

    const updateTaskStatusBody = z.object({
      done: z.boolean()
    });

    const result = updateTaskStatusBody.safeParse(req.body);

    if (!result.success) {
      if (result.error.flatten().fieldErrors?.done) {
        return res.status(400).json({
          error: `done - ${result.error.flatten().fieldErrors?.done}`
        });
      }
    } else {
      await prisma.task.update({
        data: {
          done: result.data.done
        },
        where: {
          id: taskId
        }
      });

      return res.sendStatus(204);
    }
  } catch (err) {
    console.group(err);
    res.sendStatus(500);
  }
}
