const db = require("../../../database/database");

class ticket {
  constructor(ticket) {
    this.id = ticket.id || "";
    this.title = ticket.title || "";
    this.description = ticket.description || "";
    this.author = ticket.author || "";
    this.status = ticket.status || 1;
    this.device_id = ticket.device_id || "";
    this.created_at = ticket.created_at || "";
  }

  async save(info_ticket) {
    let a = JSON.stringify(Object.values(info_ticket));
    const query = `INSERT INTO public."ticket"(title, description, author, device_id) values
        (${a.slice(1, -1).replace(/"/g, "'")})`;
    return await db.connectDb(query);
  }

  static async getAllTickets() {
    const query = `SELECT * FROM public."ticket"`;
    return await db.connectDb(query);
  }

  static async getTicketById(id) {
    const query = `SELECT * FROM public."ticket" WHERE id = ${id}`;
    return await db.connectDb(query);
  }

  static async getTicketByAuthor(user_id) {
    const query = `SELECT * FROM public."ticket" WHERE author = ${user_id}`;
    return await db.connectDb(query);
  }

  static async getTicketByDevice(device_id) {
    const query = `SELECT * FROM public."ticket" WHERE device_id = ${device_id}`;
    return await db.connectDb(query);
  }

  static async getTicketByDate(start_date, end_date, item, itemValue) {
    let query = `SELECT * FROM public."ticket" where created_at BETWEEN '${start_date}' AND '${end_date}'`;
    if (item === "author") {
      query = `SELECT * FROM public."ticket" where ${item}=${itemValue} and
                       created_at BETWEEN '${start_date}' AND '${end_date}'`;
    }
    return await db.connectDb(query);
  }

  static async getTicketByStatus(status) {
    const query = `SELECT * FROM public."ticket" WHERE status = ${status} `;
    return await db.connectDb(query);
  }

  static async setStatusTicketClose(id) {
    const query = `Update public."ticket" Set status = 2 WHERE id = ${id}`;
    return await db.connectDb(query);
  }
}

module.exports = ticket;
