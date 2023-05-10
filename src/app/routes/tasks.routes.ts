import { Router } from 'express';

import { createTask } from '../useCases/tasks/createTaskUseCase';
import { listTasks } from '../useCases/tasks/listTasks';

export const taskRoutes = Router();

taskRoutes.post('/', createTask);
taskRoutes.get('/', listTasks);
