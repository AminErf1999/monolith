const ticketCtrl = require("./controller/ticket");
const ticketAssignCtrl = require("./controller/ticket_assign");

const {
  isNullFieldsTicket,
  isValidateStatus,
  isNullAuthor,
  isNullDevice,
  isNullDate,
} = require("./middlewares/ticket");
const { isNullTicketId, isNullId } = require("./middlewares/ticket-assign");
const { verifyToken } = require("./middlewares/authentication");
const dataParser = require("backpack2-data-parser");
const {
  isSupporter,
  isStaff,
  isAdminSupporter,
  isAdmin,
} = require("./middlewares/authorization");

module.exports = {
  "/ticket": {
    GET: {
      function: ticketCtrl.getTicketById,
      middlewares: [verifyToken, dataParser, isAdminSupporter],
    },
    POST: {
      function: ticketCtrl.createTicket,
      middlewares: [verifyToken, dataParser, isNullFieldsTicket, isStaff],
    },
  },

  "/tickets": {
    GET: {
      function: ticketCtrl.getAllTickets,
      middlewares: [verifyToken, isAdminSupporter],
    },
  },

  "/device-ticket": {
    GET: {
      function: ticketCtrl.getTicketByDevice,
      middlewares: [verifyToken, dataParser, isAdminSupporter],
    },
  },

  "/user-ticket": {
    GET: {
      function: ticketCtrl.getTicketByAuthor,
      middlewares: [verifyToken, dataParser, isAdminSupporter],
    },
  },

  "/ticket-by-date": {
    GET: {
      function: ticketCtrl.getTicketByDate,
      middlewares: [verifyToken, dataParser, isNullDate],
    },
  },

  "/ticket-by-status": {
    GET: {
      function: ticketCtrl.getTicketByStatus,
      middlewares: [
        verifyToken,
        dataParser,
        isValidateStatus,
        isAdminSupporter,
      ],
    },
  },

  "/ticket-close": {
    POST: {
      function: ticketCtrl.setStatusTicketClose,
      middlewares: [verifyToken, dataParser, isSupporter],
    },
  },

  "/ticket-assign": {
    POST: {
      function: ticketAssignCtrl.setTicketAssign,
      middlewares: [dataParser, isNullTicketId],
    },
    GET: {
      function: ticketAssignCtrl.getSupporterTicketAssign,
      middlewares: [verifyToken, isSupporter],
    },
  },

  "/existance-ticket-assign": {
    POST: {
      function: ticketAssignCtrl.existenceTicketAssign,
      middlewares: [verifyToken, dataParser],
    },
  },

  "/ticket-assigns": {
    GET: {
      function: ticketAssignCtrl.getAllTicketAssign,
      middlewares: [verifyToken, dataParser, isAdmin],
    },
  },

  "/unassigned-tickets": {
    GET: {
      function: ticketAssignCtrl.getUnassignedTicketAssign,
      middlewares: [verifyToken, isAdminSupporter],
    },
  },

  "/ticket-assign/set-is-active-false": {
    POST: {
      function: ticketAssignCtrl.setActiveFalse,
      middlewares: [verifyToken, dataParser, isSupporter],
    },
  },
};
