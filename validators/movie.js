const { body } = require('express-validator/check')

exports.validate = (method) => {
    switch(method) {
        case 'add-movie': {
            return [   
                body('movie', 'movie field doesnt exist!').exists()
            ]
        }
    }
}
