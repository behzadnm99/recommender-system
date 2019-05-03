const { body } = require('express-validator/check')

exports.validate = (method) => {
    switch(method) {
        case 'add-book': {
            return [   
                body('book', 'book field doesnt exist!').exists()
            ]
        }
    }
}
