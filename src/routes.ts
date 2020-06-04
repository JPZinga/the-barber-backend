
import {Router} from 'express';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const routes = Router();

const userController = new UserController();
const authController = new AuthController();

routes.get('/users', userController.index);
routes.post('/users', userController.create);

routes.post('/users/authenticate', authController.authenticate);

export default routes;