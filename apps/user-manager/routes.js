const userCtrl = require('./controller/user');
const authenticationController = require('./controller/auth');
const dataParser = require('backpack2-data-parser');
const {verifyToken} = require('./middlewares/authentication');
const {isAdmin} = require('./middlewares/authorization');
const {isNullId, isNullFields, duplicateUsername, validatePassword, isValidateRole} = require('./middlewares/signup');


module.exports = {
    '/users': {
        GET: {
            function: userCtrl.getAllUsers,
            middlewares: [verifyToken, isAdmin]
        },
    },

    '/user': {
        POST: {
            function: userCtrl.createUser,
            middlewares: [dataParser, isNullFields, isValidateRole, verifyToken, isAdmin,
                duplicateUsername, validatePassword]
        },
        GET: {
            function: userCtrl.getUserById,
            middlewares: [dataParser, isNullId, verifyToken]
        }
    },

    '/login': {
        POST: {
            function: authenticationController.login,
            middlewares: [dataParser, isNullFields]
        }
    }

}

