import { Router } from 'express';
import userController from '../../controllers/user'
import auth from '../auth'

const userRouter = new Router();

userRouter.post('/add', auth.optional, (req, res, next) => userController.signin(req, res, next));
userRouter.get('/login', auth.optional, (req, res, next) => userController.login(req, res, next));
userRouter.get('/current', auth.required, (req, res, next) => userController.current(req, res, next));
userRouter.put('/:id', auth.required, (req, res, next) => userController.current(req, res, next));
userRouter.delete('/:id', auth.required, (req, res, next) => userController.current(req, res, next));

export default userRouter;