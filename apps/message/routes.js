const messageCtrl = require('./controller/message');
const dataParser = require('backpack2-data-parser');
const {verifyToken} = require("../user-manager/middlewares/authentication");
const {isStaffSupporter} = require("../user-manager/middlewares/authorization");
const {isNullTicketId, isNullContent} = require("./middelwares/message")

module.exports = {
    '/message': {
        POST: {
            function: messageCtrl.createMessage,
            middlewares: [dataParser, isNullContent, isNullTicketId, verifyToken, isStaffSupporter]
        },
        GET: {
            function: messageCtrl.getMessages,
            middlewares: [dataParser, isNullTicketId, verifyToken, isStaffSupporter]
        },

    },
}