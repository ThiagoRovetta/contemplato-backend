import express from 'express';
import cors from 'cors';

import { router } from './app/routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
