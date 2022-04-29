const db = require('../../../database/database')

class auth {

    static async getUserByItem(item, value) {
        const query = `SELECT * FROM backpack2.user WHERE ${item} = '${value}' LIMIT 1`;
        return await db.connectDb(query);
    }
}


module.exports = auth;
