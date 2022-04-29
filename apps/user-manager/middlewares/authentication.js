const authentication = require("jsonwebtoken");
const response_handler = require('../../../utils/response-handler');
const c = require('../../../utils/config');
const {extractToken} = require('../utils/jwt-parser');

module.exports.verifyToken = (req, res, next) => {
    const token = extractToken(req)
    if (!token) {
        return response_handler.sendFail(res, c.statusCodes.UNAUTHORIZED, {message: c.messages.invalidToken})
    }
    try {
        req.user = authentication.verify(token, c.TOKEN_KEY);
        console.log('---->', req.user.user_id)
    } catch (err) {
        return response_handler.sendFail(res, c.statusCodes.UNAUTHORIZED, {message: c.messages.invalidToken})
    }
    return next();
};
