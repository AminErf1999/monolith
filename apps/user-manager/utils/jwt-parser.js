const jwt = require("jsonwebtoken");

/*
** parse payload of token => token split by ots '.'.
 */
module.exports.parseJwt  = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

/*
** parse token from headers => header = 'Token <token>'.
 */
module.exports.extractToken = (req) => {
    if (req.headers.authorization) {
        return req.headers.authorization.split(' ')[1];
    }
    else if (req.headers.token) {
        return req.headers.token;
    }
    return null;
}