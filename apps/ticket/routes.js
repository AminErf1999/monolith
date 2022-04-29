const ticketCtrl = require('./controllers/ticket');
const ticketAssignCtrl = require('./controllers/ticket_assign');
const dataParser = require('backpack2-data-parser');
const {isNullFieldsTicket, isValidateStatus, isNullAuthor, isNullDevice, isNullDate} = require('./middlewares/ticket');
const {isNullTicketId, isNullId} = require('./middlewares/ticket-assign');
const {verifyToken} = require("../user-manager/middlewares/authentication");
const {isSupporter, isStaff, isAdminSupporter, isAdmin} = require("../user-manager/middlewares/authorization");


module.exports = {
    '/ticket': {
        POST: {
            function: ticketCtrl.createTicket,
            middlewares: [dataParser, isNullFieldsTicket, verifyToken, isStaff]
        },
        GET: {
            function: ticketCtrl.getTicketById,
            middlewares: [dataParser, verifyToken, isAdminSupporter]
        }
    },

    '/tickets': {
        GET: {
            function: ticketCtrl.getAllTickets,
            middlewares: [verifyToken, isAdminSupporter]
        }
    },

    '/device-ticket': {
        GET: {
            function: ticketCtrl.getTicketByDevice,
            middlewares: [dataParser, verifyToken, isAdminSupporter]
        }
    },

    '/user-ticket': {
        GET: {
            function: ticketCtrl.getTicketByAuthor,
            middlewares: [dataParser, verifyToken, isAdminSupporter]
        }
    },

    '/ticket-by-date': {
        GET: {
            function: ticketCtrl.getTicketByDate,
            middlewares: [dataParser, isNullDate, verifyToken]
        }
    },

    '/ticket-by-status': {
        GET: {
            function: ticketCtrl.getTicketByStatus,
            middlewares: [dataParser, isValidateStatus, verifyToken, isAdminSupporter]
        }
    },

    '/ticket-close' : {
        POST: {
            function: ticketCtrl.setStatusTicketClose,
            middlewares: [dataParser, verifyToken, isSupporter]
        }
    },

    '/ticket-assign': {
        POST: {
            function: ticketAssignCtrl.setTicketAssign,
            middlewares: [dataParser, isNullTicketId]
        },
        GET: {
            function: ticketAssignCtrl.getSupporterTicketAssign,
            middlewares: [verifyToken, isSupporter]
        }
    },

    '/ticket-assigns' : {
        GET: {
            function: ticketAssignCtrl.getAllTicketAssign,
            middlewares: [dataParser, verifyToken, isAdmin]
        }
    },

    '/unassigned-tickets' : {
        GET: {
            function: ticketAssignCtrl.getUnassignedTicketAssign,
            middlewares: [verifyToken, isAdminSupporter]
        }
    },

    '/ticket-assign/set-is-active-false' : {
        POST: {
            function: ticketAssignCtrl.setActiveFalse,
            middlewares: [dataParser, verifyToken, isSupporter]
        }
    }

}

