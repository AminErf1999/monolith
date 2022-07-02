const messageCtrl = require("./controller/message");
const dataParser = require("backpack2-data-parser");
const { verifyToken } = require("./middelwares/authentication");
const { isNullTicketId, isNullContent } = require("./middelwares/message");

module.exports = {
  "/message": {
    POST: {
      function: messageCtrl.createMessage,
      middlewares: [dataParser, isNullContent, isNullTicketId, verifyToken],
    },
    GET: {
      function: messageCtrl.getMessages,
      middlewares: [dataParser, isNullTicketId, verifyToken],
    },
  },
};
