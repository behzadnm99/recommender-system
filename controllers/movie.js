const movieController = {};

movieController.getAll = (req, res) => {
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

movieController.get = (req, res) => {
    console.log(req.params)
    res.send({'msg':'asd'})
}


movieController.post = (req, res) => {

}

movieController.put = (req, res) => {

}

movieController.delete = (req, res) => {

}

export default movieController;