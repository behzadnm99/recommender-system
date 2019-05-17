import { Router } from 'express';

import bookController from '../../controllers/book';
import { validate } from "../../validators/book";
import auth from '../auth';

const bookRouter = new Router();

bookRouter.get('/get/all/', auth.optional, (req, res) => bookController.getAll(req, res));
bookRouter.get('get/:id', auth.optional ,(req, res) => bookController.get(req, res));
bookRouter.post('/add', validate('add-book'), auth.required, (req, res, next) => bookController.post(req,res));
bookRouter.put('/:id', auth.required ,(req, res) => bookController.put(req,res));
bookRouter.delete('/:id', auth.required ,(req, res) => bookController.delete(req,res));

export default bookRouter;  