import { Router } from 'express';
import movieController from '../../controllers/movie'

const movieRouter = new Router();

movieRouter.get('/movie/getall', (req, res) => movieController.getAll(req, res));

export default movieRouter;