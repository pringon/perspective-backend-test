export { makeApi };

import cors from 'cors';
import express, { Express } from 'express';

import { makeController } from './controller';
import { UserRepository } from './repository';

function makeApi(userRepo: UserRepository): Express {
    const app = express();
    app.use(cors()).use(express.json()).options('*', cors());

    const userController = makeController(userRepo);

    app.post('/users', userController.postUser);
    app.get('/users', userController.getUsers);

    return app;
}
