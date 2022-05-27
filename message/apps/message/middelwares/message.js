const response_handler = require("../../../utils/response-handler");
const c = require("../../../utils/config");

module.exports.isNullTicketId= (req, res, next) => {
    const ticket_id = req.data.ticket_id;
    if (!ticket_id) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'ticket_id is required');
    } else return next();
}

module.exports.isNullContent= (req, res, next) => {
    const content = req.data.content;
    if (!content) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'content is required');
    } else return next();
}