import { Router } from 'express';

import { createTask } from '../useCases/tasks/createTaskUseCase';
import { listTasks } from '../useCases/tasks/listTasks';
import { updateTaskStatus } from '../useCases/tasks/updateTaskStatusUseCase';

export const taskRoutes = Router();

taskRoutes.post('/', createTask);
taskRoutes.get('/', listTasks);
taskRoutes.patch('/:id', updateTaskStatus);
