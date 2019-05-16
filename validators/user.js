const { body } = require('express-validator/check')

exports.validate = (method) => {
    switch(method) {
        case 'login': {
            return [   
                body('user', 'user field doesnt exist!').exists()
            ]
        }
    }
}
