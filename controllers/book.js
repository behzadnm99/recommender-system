import Books from '../models/book'

const bookController = {};

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


bookController.post = (req, res) => {

}

bookController.put = (req, res) => {

}

bookController.delete = (req, res) => {

}

export default bookController;