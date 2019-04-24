import { Router } from 'express';
import bookController from '../controllers/book'

const bookRouter = new Router();

bookRouter.get('/book/getall', (req, res) => bookController.getAll(req, res));
bookRouter.get('/get/:id', (req, res) => bookController.get(req, res))

export default bookRouter;