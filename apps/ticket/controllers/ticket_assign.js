const TicketAssign = require('../models/ticket-assign');
const response_handler = require('../../../utils/response-handler');
const {extractToken, parseJwt} = require('../../user-manager/utils/jwt-parser');
const c = require('../../../utils/config');

/*
** check if there is an active ticket assign for this ticket.
 */
async function existenceActiveTicketAssign(ticket_id) {
    let ticket_assign = await TicketAssign.getIsActiveTicketAssign(ticket_id);
    return ticket_assign.length >= 1;
}

/*
** set is_active ticket assign false when ticket is closed.
 */
async function setFalseActiveCloseTicket(user_id, ticket_id){
    let ticket_assign = await TicketAssign.getTicketAssign(user_id, ticket_id);
    await TicketAssign.setActiveFalse(ticket_assign[0].id);
}

async function existenceTicketAssign(user_id, ticket_id) {
    let ticket_assign = await TicketAssign.getTicketAssign(user_id, ticket_id);
    return ticket_assign.length >= 1;
}

async function setTicketAssign(req, res) {
    let token = extractToken(req);
    let payload = parseJwt(token);
    if (await existenceActiveTicketAssign(req.data.ticket_id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "this ticket is assigned already.")
    } else {
        let info = {
            ticket_id: req.data.ticket_id,
            assign_id: payload.user_id,
            is_active: true
        };
        let ticket_assign = new TicketAssign(info);
        await ticket_assign.save(info).then((result) => console.log('save ticket_assign to db'));

        response_handler.sendOk(res, 'ticket assign set successfully');
    }
}

async function getAllTicketAssign(req, res) {
    let ticketAssigns = await TicketAssign.getAllTicketAssign();
    response_handler.sendOk(res, {ticketAssigns});
}

async function getSupporterTicketAssign(req, res) {
    let token = extractToken(req);
    let payload = parseJwt(token);
    let ticketAssigns = await TicketAssign.getAssignedTicketById(payload.user_id);
    response_handler.sendOk(res, {ticketAssigns});
}

async function getUnassignedTicketAssign(req, res) {
    let unassigned = await TicketAssign.getUnassignedTicket();
    response_handler.sendOk(res, {unassigned});
}

async function setActiveFalse(req, res) {
    let ticket_assign = await TicketAssign.setActiveFalse(req.data.id);
    response_handler.sendOk(res, "ticket assign is not active anymore.");
}

module.exports = {
    setTicketAssign,
    getAllTicketAssign,
    getSupporterTicketAssign,
    getUnassignedTicketAssign,
    setActiveFalse,
    existenceTicketAssign,
    setFalseActiveCloseTicket
}