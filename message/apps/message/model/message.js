const db = require('../../../database/database')

class message {
    constructor(message) {
        this.id = message.id || '';
        this.content = message.content || '';
        this.sender_id = message.sender_id || '';
        this.reply_to = message.reply_to || '';
        this.ticket_id = message.ticket_id || '';
    }

    async save(info_message) {
        let a = JSON.stringify(Object.values(info_message));
        const query = `INSERT INTO backpack2.message(content, sender_id, reply_to, ticket_id) values
        (${a.slice(1, -1).replace(/"/g, "'")})`;
        return await db.connectDb(query);
    }

    static async getMessages(ticket_id) {
        const query = `SELECT * FROM backpack2.message WHERE ticket_id = ${ticket_id}`;
        return await db.connectDb(query);
    }

}

module.exports = message;
