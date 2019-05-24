'use-strict';

import Books from '../models/book'
import Users from '../models/user';
import { check, validationResult } from  'express-validator/check';
import minioClicent from '../config/minio';

const bookController = {
};

bookController.getAll = async(req, res) => {
    const {page, genre, limit} = req.query;
    const _limit = Number(limit) || 10;
    const _page = Number(page) || 1;
   
    try {
        const books = await Books.find({genre: genre}).sort('-createdAt').skip((_limit * _page) - limit).limit(_limit);
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
    
    const { payload: { id } } = req;
    const { body, file } = req;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        const bookObject = Object.assign({},{coverName: file.filename},body);
        let newBook = await Books.create(bookObject);
        let user = await Users.findById(id);
        user.books.push(newBook);
        user.save();
        if(req.file) {
            await minioClicent.fPutObject("books-img", req.file.filename, req.file.path, {entity: 'books', user: id, parentId: newBook._id});
        }
        res.status(200).send({
            status: 'success',
            message: 'book added to user library successfully'
        });
    } catch(err) {
        console.log(err)
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