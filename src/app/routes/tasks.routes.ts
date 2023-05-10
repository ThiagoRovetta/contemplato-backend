import { Router } from 'express';

import { createTask } from '../useCases/tasks/createTaskUseCase';

export const taskRoutes = Router();

taskRoutes.post('/', createTask);
