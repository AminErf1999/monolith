const c = require('./config');

module.exports.sendOk = (res, data) => {
    res.statusCode = c.statusCodes.SUCCESS;
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify(data));
}

module.exports.sendFail = (res, statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify(data));
}