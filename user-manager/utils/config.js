const errors = {};

const messages = {
    loginFailed: 'Wrong username or password!',
    accessDenied: 'access denied!',
    invalidToken: 'Invalid token!',
    conflict: 'duplicate username',
    error: 'error',
    badReq: 'bad request'

};

const TOKEN_KEY = 'promise123';
const TOKEN_EXPIRE_IN = '1y';

const statusCodes = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    ERROR: 500,
    BAD_REQUEST: 400
};

const contentTypes = {
    JSON: 'application/json'
};

module.exports = {
    statusCodes,
    contentTypes,
    errors,
    messages,
    TOKEN_KEY,
    TOKEN_EXPIRE_IN
};
