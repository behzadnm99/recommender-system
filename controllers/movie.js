import Movies from '../models/movie';
import Users from '../models/user';
import { check, validationResult } from  'express-validator/check';
import minioClient from '../config/minio';

const movieController = {};

movieController.getAll = async(req, res) => {
    const {page, genre, limit} = req.query;
    const _limit = Number(limit);
    const _page = Number(page);
    try {
        const movies = await Movies.find({genre: genre}).sort('createdAt').skip((_limit * _page) - _limit).limit(_limit);
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
    
    const { payload: { id } } = req;
    const { body, file } = req;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        let movieObject = Object.assign({},{coverName: file.filename},body);
        let newMovie = await Movies.create(movieObject);
        let user = await Users.findById(id);
        user.movies.push(newMovie);
        user.save();
        if(file) {
            const minioCover = await minioClient.fPutObject("movies-img", file.originalname, file.path, {entity: 'movie', user: id, parentId: newMovie._id});
        }
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