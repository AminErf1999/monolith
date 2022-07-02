const Message = require("../models/message");
const {
  existanceTicketAssign,
  getTicketById,
} = require("../models/ticket-assign");
const response_handler = require("../../../utils/response-handler");
const c = require("../../../utils/config");
const { extractToken, parseJwt } = require("../utils/jwt-parser");

/*
 ** check if the author of ticket is staff.
 */
// async function isTicketAuthorStaff(user_id, ticket_id) {
//   let ticket = await getTicketById(ticket_id);
//   return ticket[0].author === user_id;
// }

/*
 ** check if the ticket is assigned to this supporter.
 */
async function isTicketAssignedToSupporter(user_id, ticket_id) {
  let isTicketAssigned = await existanceTicketAssign(user_id, ticket_id);
  return isTicketAssigned;
}

/*
 ** check if the sender of message is author/supporter of ticket.
 */
async function isValidSender(payload, ticket_id) {
  if (
    payload.role === 2 &&
    !(await isTicketAssignedToSupporter(payload.user_id, ticket_id))
  ) {
    return false;
  }
  return true;
}

async function isTicketOpen(ticket_id) {
  let ticket = await getTicketById(ticket_id);
  return ticket[0].status !== 2;
}

async function createMessage(req, res) {
  let token = extractToken(req);
  let payload = parseJwt(token);
  if (!(await isValidSender(payload, req.data.ticket_id))) {
    response_handler.sendFail(
      res,
      c.statusCodes.BAD_REQUEST,
      "sender is not author/supporter of ticket"
    );
  } else if (!(await isTicketOpen(req.data.ticket_id))) {
    response_handler.sendFail(
      res,
      c.statusCodes.BAD_REQUEST,
      "ticket is closed."
    );
  } else {
    let info = {
      content: req.data.content,
      sender_id: payload.user_id,
      reply_to: req.data.reply_to || undefined,
      ticket_id: req.data.ticket_id,
    };
    let message = new Message(info);
    await message
      .save(info)
      .then((result) => console.log("save message to db"));

    response_handler.sendOk(res, "message created successfully");
  }
}

async function getMessages(req, res) {
  let token = extractToken(req);
  let payload = parseJwt(token);
  if (!(await isValidSender(payload, req.data.ticket_id))) {
    response_handler.sendFail(
      res,
      c.statusCodes.BAD_REQUEST,
      "sender is not author/supporter of ticket"
    );
  } else {
    let messages = await Message.getMessages(req.data.ticket_id);
    response_handler.sendOk(res, { messages });
  }
}

module.exports = {
  createMessage,
  getMessages,
};
