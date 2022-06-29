const db = require("../../../database/database");

class ticketAssign {
  constructor(ticketAssign) {
    this.id = ticketAssign.id || "";
    this.ticket_id = ticketAssign.ticket_id || "";
    this.assignee_id = ticketAssign.assignee_id || "";
    this.is_active = ticketAssign.is_active || "";
    this.created_at = ticketAssign.created_at || " ";
  }

  async save(info_ticketAssign) {
    let a = JSON.stringify(Object.values(info_ticketAssign));
    const query = `INSERT INTO public."ticket_assign"(ticket_id, assignee_id , is_active) values
        (${a.slice(1, -1).replace(/"/g, "'")})`;
    return await db.connectDb(query);
  }

  static async getAllTicketAssign() {
    const query = `SELECT * FROM public."ticket_assign"`;
    return await db.connectDb(query);
  }

  static async getAssignedTicketById(supporter_id) {
    const query = `SELECT * FROM public."ticket" t
                       INNER JOIN public."ticket_assign" te ON te.assignee_id=${supporter_id} and te.ticket_id=t.id`;
    return await db.connectDb(query);
  }

  static async setActiveFalse(id) {
    const query = `UPDATE public."ticket_assign" SET is_active=False WHERE id=${id}`;
    return await db.connectDb(query);
  }

  static async getUnassignedTicket() {
    const query = `SELECT (t1.id, t1.title, t1.description, t1.author, t1.status, t1.device_id) 
                       FROM public."ticket" t1
                       LEFT JOIN public."ticket_assign" t2 ON t1.id = t2.ticket_id
                       WHERE t2.ticket_id IS NULL`;
    return await db.connectDb(query);
  }

  static async getIsActiveTicketAssign(ticket_id) {
    const query = `SELECT * FROM public."ticket_assign" WHERE ticket_id=${ticket_id}
                       and is_active=True`;
    return await db.connectDb(query);
  }

  static async getTicketAssign(user_id, ticket_id) {
    const query = `SELECT * FROM public."ticket_assign" WHERE ticket_id=${ticket_id} and assignee_id = ${user_id}`;
    return await db.connectDb(query);
  }
}

module.exports = ticketAssign;
