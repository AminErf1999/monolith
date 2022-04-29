const c = require('../../../utils/config');
const passwordComplexity = require("joi-password-complexity");
const response_handler = require('../../../utils/response-handler');
const modelUser = require('../models/auth')


/*
** check username and password not to be null.
 */
module.exports.isNullFields = (req, res, next) => {
    const password = req.data.password;
    const username = req.data.username;
    if (!password || ! username){
        response_handler.sendFail(res,c.statusCodes.BAD_REQUEST, 'username and password is required');
    }
    else return next();
}

module.exports.isNullId = (req, res, next) => {
    const user_id = req.data.id;
    if (!user_id){
        response_handler.sendFail(res,c.statusCodes.BAD_REQUEST, 'user id is required');
    }
    else return next();
}

/*
** check username not taken before
 */
module.exports.duplicateUsername = async (req, res, next) => {
    const username = req.data.username;
    let user = await modelUser.getUserByItem('username', username);
    console.log(user.length);
    if (user.length > 0) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'this username is already taken');
    } else return next();
}

/*
** check validate password => min=8, max=26, contains at least one lower case and upper case
** , at least one number and one symbol.
 */
module.exports.validatePassword = (req, res, next) => {
    const password = req.data.password;
    const complexityOptions = {
        min: 8, max: 26, lowercase: 1,
        uppercase: 1, numeric: 1, symbol: 1, requirementCount: 4
    };
    const validatePass = passwordComplexity(complexityOptions).validate(password);
    if (validatePass.error) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'not validate password');
    }
    else return next();
}


/*
** validation for role to check between 1 to 3:
** 1 => admin
** 2 => supporter
** 3 => staff
 */
module.exports.isValidateRole = (req, res, next) => {
    let role = req.data.role;
    if (role > 3 || role < 0){
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "role should be 1, 2 or 3.")
    }
    else next();
}
