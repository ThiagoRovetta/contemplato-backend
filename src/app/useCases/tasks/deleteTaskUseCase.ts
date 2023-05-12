import { Request, Response } from 'express';
import { prisma } from '../../utils/prisma';

export async function deleteTask(req: Request, res: Response) {
  try {
    await prisma.task.delete({
      where: {
        id: Number(req.params.id)
      }
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
