import { Router } from 'express';
import bookController from '../controllers/book'

const bookRouter = new Router();

bookRouter.get('/book/getall', (req, res) => bookController.getAll(req, res));

export default bookRouter;