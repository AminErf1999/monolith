const c = require('../../../utils/config');
const jwt = require("jsonwebtoken");

module.exports.sign = (payload) => {
    return jwt.sign(
        payload,
        c.TOKEN_KEY,
        {
            expiresIn: c.TOKEN_EXPIRE_IN,
        }
    );
}