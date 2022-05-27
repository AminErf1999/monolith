const db = require('../../../database/database')

class auth {

    static async getUserByItem(item, value) {
        const query = `SELECT * FROM public."user" WHERE ${item} = '${value}' LIMIT 1`;
        return await db.connectDb(query);
    }
}


module.exports = auth;
