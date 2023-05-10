import { Router } from 'express';

import { authenticateUserUseCase } from '../useCases/users/authenticateUserUseCase';

export const authenticateRoutes = Router();

authenticateRoutes.post('/authenticate', authenticateUserUseCase);
