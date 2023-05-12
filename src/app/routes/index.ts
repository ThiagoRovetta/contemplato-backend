import { Router } from 'express';

import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { taskRoutes } from './tasks.routes';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const router = Router();

router.use('/users', ensureAuthenticated, usersRoutes);
router.use(authenticateRoutes);
router.use('/tasks', ensureAuthenticated, taskRoutes);
