const response_handler = require("../../../utils/response-handler");
const c = require("../../../utils/config");

module.exports.isNullFieldsTicket = (req, res, next) => {
    const title = req.data.title;
    const description = req.data.description;
    const device_id = req.data.device_id;
    if (!title || !description || !device_id) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'title and description and author and device_id ' +
            'are required');
    } else return next();
}

/*
** status:
** 1 -> open
** 2 -> close
 */
module.exports.isValidateStatus = (req, res, next) => {
    const status = req.data.status;
    if (status < 0 || status > 2) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'status should set by 1 or 2 ')
    } else return next();
}

module.exports.isNullAuthor = (req, res, next) => {
    const author = req.data.author;
    if (!author) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'author is required');
    } else return next();
}

module.exports.isNullDevice = (req, res, next) => {
    const device = req.data.device;
    if (!device) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'device is required');
    } else return next();
}

module.exports.isNullDate = (req, res, next) => {
    const start_date = req.data.start_date;
    const end_date = req.data.end_date;
    if (!start_date || !end_date) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'start_date and end_date are required');
    } else return next();
}