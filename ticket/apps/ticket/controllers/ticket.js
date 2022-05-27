const Ticket = require('../models/ticket');
const response_handler = require('../../../utils/response-handler');
const c = require('../../../utils/config');
const {isStaff} = require('../../user-manager/controller/user');
const {existenceDevice} = require('../../device/controller/device');
const {extractToken, parseJwt} = require('../../user-manager/utils/jwt-parser');
const existenceUserDevice = require('../../device/controller/user-device').existenceUserDevice;
const {existenceTicketAssign, setFalseActiveCloseTicket} = require('./ticket_assign');


async function existenceTicket(id) {
    let ticket = await Ticket.getTicketById(id);
    return ticket.length >= 1;
}

function SenderInfo(req) {
    let token = extractToken(req);
    let payload = parseJwt(token);
    let result = {
        isStaff: false,
        role: payload.role,
        user_id: payload.user_id
    }
    if (payload.role === 3) {
        result.isStaff = true;
    }
    return result;
}

async function createTicket(req, res) {
    let sender_info = SenderInfo(req);
    if (!await existenceUserDevice(sender_info.user_id, req.data.device_id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "this user is not the owner of this device!");
    } else {
        let info = {
            title: req.data.title,
            description: req.data.description,
            author: sender_info.user_id,
            device_id: req.data.device_id,
        };
        let ticket = new Ticket(info);
        await ticket.save(info).then((result) => console.log('save ticket to db'));

        response_handler.sendOk(res, 'ticket created successfully');
    }

}

async function getAllTickets(req, res) {
    let tickets = await Ticket.getAllTickets();
    response_handler.sendOk(res, {tickets});
}

async function getTicketById(req, res) {
    let ticket = await Ticket.getTicketById(req.data.id);
    response_handler.sendOk(res, {ticket});
}

async function getTicketByAuthor(req, res) {
    if (!await isStaff(req.data.author)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "author is not available!")
    } else {
        let ticket = await Ticket.getTicketByAuthor(req.data.author);
        response_handler.sendOk(res, {ticket});
    }
}

async function getTicketByDevice(req, res) {
    if (!await existenceDevice(req.data.device_id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "device is not available!")
    } else {
        let ticket = await Ticket.getTicketByDevice(req.data.device_id);
        response_handler.sendOk(res, {ticket});
    }
}

/*
** the format of date should be yyyy-mm-dd
 */
async function getTicketByDate(req, res) {
    let userAccess = SenderInfo(req);
    let tickets;
    if (userAccess.isStaff) {
        tickets = await Ticket.getTicketByDate(req.data.start_date, req.data.end_date,
            "author", userAccess.user_id);
    } else {
        tickets = await Ticket.getTicketByDate(req.data.start_date, req.data.end_date,
            "isSupporter", userAccess.user_id);
    }
    response_handler.sendOk(res, {tickets});
}

async function getTicketByStatus(req, res) {
    let tickets = await Ticket.getTicketByStatus(req.data.status);
    response_handler.sendOk(res, {tickets});
}

async function setStatusTicketClose(req, res) {
    let info = SenderInfo(req);
    if (!await existenceTicket(req.data.id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "ticket doesn't exist");
    } else if (!await existenceTicketAssign(info.user_id, req.data.id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "ticket doesn't assign to this supporter");
    } else {
        let ticket = await Ticket.setStatusTicketClose(req.data.id);
        await setFalseActiveCloseTicket(info.user_id, req.data.id);
        response_handler.sendOk(res, "Ticket is closed");
    }
}

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    getTicketByDevice,
    getTicketByAuthor,
    getTicketByDate,
    getTicketByStatus,
    setStatusTicketClose
};