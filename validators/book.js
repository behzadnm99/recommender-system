const { body } = require('express-validator/check')

exports.validate = (method) => {
    switch(method) {
        case 'add-book': {
            return [   
                body('name', 'name field doesnt exist!').exists(),
                body('description', 'description field doesnt exist!').exists(),
                // body('cover', 'cover field doesnt exist!').exists(),
                body('stars', 'stars field doesnt exist!').exists()
            ]
        }
    }
}
