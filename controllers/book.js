import Books from '../models/book'
import Users from '../models/user';

const bookController = {
};

bookController.getAll = (req, res) => {
    Books.find((err, users) => {
        if(err){
            res.status(400).send({
                'err': err.toString()
            })
        } else if(users) {
            res.status(200).send({
                users: users
            })
        }
    })
}

bookController.get = (req, res) => {
    console.log(req.params)
    res.send({'msg':'asd'})
}


bookController.post = async(req, res) => {
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
        })

    } catch(err) {
        res.status(400).send({
            status: 'failed',
            message: err.name,
            description: err.message
        })
    }
}

bookController.put = (req, res) => {

}

bookController.delete = (req, res) => {

}

export default bookController;