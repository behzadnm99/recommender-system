import { Router } from 'express';
import userController from '../../controllers/user'
import auth from '../auth'

const userRouter = new Router();

userRouter.post('/', auth.optional, (req, res) => userController.create(req, res));

export default userRouter;