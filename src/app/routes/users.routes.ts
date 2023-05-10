import { Router } from 'express';

import { createUser } from '../useCases/users/createUser';

export const usersRoutes = Router();

usersRoutes.post('/', createUser);
