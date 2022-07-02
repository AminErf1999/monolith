const axios = require("axios");

async function existanceTicketAssign(user_id, ticket_id) {
  try {
    const body = {
      user_id,
      ticket_id,
    };
    const user = await axios({
      method: "POST",
      url: `http://127.0.0.1:3002/existance-ticket-assign`,
      headers: req.headers,
      data: body,
    });
    return user ? true : false;
  } catch (error) {
    console.log(error);
  }
}

async function getTicketById(ticket_id) {
  try {
    const user = await axios({
      method: "GET",
      url: `http://127.0.0.1:3002/ticket?id=${ticket_id}`,
      headers: req.headers,
    });
    return user ? true : false;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  existanceTicketAssign,
  getTicketById,
};
