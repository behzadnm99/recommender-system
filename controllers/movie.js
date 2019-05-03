import Movies from '../models/movie';
import Users from '../models/user';
import { check, validationResult } from  'express-validator/check';

const movieController = {};

movieController.getAll = async(req, res) => {
    const {page, genre} = req.query;

    try {
        const movies = await Movies.find({genre: genre}).skip((10 * page) - 10).limit(10);
        res.send({
            status: 'success',
            data:movies
        })
    } catch(err) {
        res.status(400).send({
            status: 'failed',
            message: err.name,
            description: err.message
        })
    }
}

movieController.get = (req, res) => {

}


movieController.post = async(req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    
    const { payload: { id } } = req;
    const { body } = req;

    try {
        let newMovie = await Movies.create(body.movie);
        let user = await Users.findById(id);
        user.movies.push(newMovie);
        user.save();
        res.status(200).send({
            status: 'success',
            message: 'movie added to user library successfully'
        })
    } catch(err) {
        res.status(400).send({
            status: 'failed',
            message: err.name,
            description: err.message
        })
    }
}

movieController.put = (req, res) => {

}

movieController.delete = (req, res) => {

}

export default movieController;