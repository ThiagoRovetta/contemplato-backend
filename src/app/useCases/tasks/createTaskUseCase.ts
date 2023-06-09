import { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../../utils/prisma';

export async function createTask(req: Request, res: Response) {
  try {
    const createTaskBody = z.object({
      task: z.string(),
      done: z.boolean().optional()
    });

    const result = createTaskBody.safeParse(req.body);

    if (!result.success) {
      if (result.error.flatten().fieldErrors?.task) {
        return res.status(400).json({
          error: `task - ${result.error.flatten().fieldErrors?.task}`
        });
      }
    } else {
      const newTask = await prisma.task.create({
        data: {
          task: result.data.task,
          done: result.data.done ?? false,
          userId: req.user.id
        }
      });

      return res.status(201).json(newTask);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
