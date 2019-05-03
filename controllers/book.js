import Books from '../models/book'
import Users from '../models/user';
import { check, validationResult } from  'express-validator/check';

const bookController = {
};

bookController.getAll = async(req, res) => {
    const {page, genre} = req.query;

    try {
        const books = await Books.find({genre: genre}).skip((10 * page) - 10).limit(10);
        res.send({
            status: 'success',
            data: books
        })
    } catch(err) {
        res.status(400).send({
            status: 'failed',
            message: err.name,
            description: err.message
        })
    }
}

bookController.get = (req, res) => {

}

bookController.post = async(req, res, next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    
    const { payload: { id } } = req;
    const { body } = req;

    try {
        let newBook = await Books.create(body.book);
        let user = await Users.findById(id);
        user.books.push(newBook);
        user.save();
        res.status(200).send({
            status: 'success',
            message: 'book added to user library successfully'
        });
    } catch(err) {
        res.status(400).send({
            status: 'failed',
            message: err.name,
            description: err.message
        });
    }
}

bookController.put = (req, res) => {

}

bookController.delete = (req, res) => {

}

export default bookController;