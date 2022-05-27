const {extractToken, parseJwt} = require('../utils/jwt-parser');
const {sendFail} = require('../../../utils/response-handler');
const c = require('../../../utils/config');


module.exports.isAdmin = (req, res, next) => {
    const token = extractToken(req)
    if (!token) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: c.messages.invalidToken})
    }
    let payload = parseJwt(token)
    console.log(payload);
    if (payload.role === 1) {
        return next();
    } else {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: 'user is not admin'})
    }
}

module.exports.isSupporter = (req, res, next) => {
    const token = extractToken(req)
    if (!token) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: c.messages.invalidToken})
    }
    let payload = parseJwt(token)
    console.log(payload);
    if (payload.role === 2) {
        return next();
    } else {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: 'user is not supporter'})
    }
}

module.exports.isStaff = (req, res, next) => {
    const token = extractToken(req)
    if (!token) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: c.messages.invalidToken})
    }
    let payload = parseJwt(token)
    console.log(payload);
    if (payload.role === 3) {
        return next();
    } else {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: 'user is not staff'})
    }
}

module.exports.isAdminSupporter = (req, res, next) => {
    const token = extractToken(req)
    if (!token) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: c.messages.invalidToken})
    }
    let payload = parseJwt(token)
    console.log(payload);
    if (payload.role === 1 || payload.role === 2) {
        return next();
    } else {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: 'user is not admin or supporter'})
    }
}

module.exports.isStaffSupporter = (req, res, next) => {
    const token = extractToken(req)
    if (!token) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: c.messages.invalidToken})
    }
    let payload = parseJwt(token)
    console.log(payload);
    if (payload.role === 3 || payload.role === 2) {
        return next();
    } else {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: 'user is not staff or supporter'})
    }
}