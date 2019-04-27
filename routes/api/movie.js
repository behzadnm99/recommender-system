import { Router } from 'express';
import movieController from '../../controllers/movie'
import auth from '../auth';

const movieRouter = new Router();

movieRouter.get('/get/all', auth.optional ,(req, res) => movieController.getAll(req, res));
movieRouter.get('get/:id', auth.optional ,(req, res) => movieController.get(req, res));
movieRouter.post('/add', auth.required ,(req, res) => movieController.post(req,res));
movieRouter.put('/:id', auth.required ,(req, res) => movieController.post(req,res));
movieRouter.delete('/:id', auth.required ,(req, res) => movieController.post(req,res));

export default movieRouter;