import { Router } from 'express';
import bookController from '../../controllers/book';
import auth from '../auth';

const bookRouter = new Router();

bookRouter.get('/get/all', auth.optional ,(req, res) => bookController.getAll(req, res));
bookRouter.get('get/:id', auth.optional ,(req, res) => bookController.get(req, res));
bookRouter.post('/add', auth.required ,(req, res) => bookController.post(req,res));
bookRouter.put('/:id', auth.required ,(req, res) => bookController.post(req,res));
bookRouter.delete('/:id', auth.required ,(req, res) => bookController.post(req,res));

export default bookRouter;