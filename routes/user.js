import { Router } from 'express';
import userController from '../controllers/user'

const userRouter = new Router();

userRouter.get('/user/getall', (req, res) => userController.getAll(req, res));

export default userRouter;