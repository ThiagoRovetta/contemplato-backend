import { Request, Response } from 'express';
import { prisma } from '../../utils/prisma';

export async function listTasks(req: Request, res: Response) {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: {
        userId
      }
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
