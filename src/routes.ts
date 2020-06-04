
import {Router} from 'express';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const routes = Router();
const userRoutes = Router();

const userController = new UserController();
const authController = new AuthController();


userRoutes.get('/users', userController.index);
userRoutes.post('/users', userController.create);
userRoutes.post('/users/authenticate', authController.authenticate);

routes.get('/barbershop', (req, res) => {
  res.send({"message": "Ok"});
})

export default {userRoutes, routes};