const db = require('../../../database/database')

class user {
    constructor(user) {
        this.id = user.id || '';
        this.username = user.username || '';
        this.password = user.password || '';
        this.role = user.role || '';
    }

    async save(info_user) {
        let a = JSON.stringify(Object.values(info_user));
        const query = `INSERT INTO backpack2.user(username, password, role)  values 
        (${a.slice(1, -1).replace(/"/g, "'")})`;
        return await db.connectDb(query);
    }

    static async getAllUsers() {
        const query = `SELECT * FROM backpack2.user`;
        return await db.connectDb(query);
    }

    static async getUserById(id) {
        const query = `SELECT * FROM backpack2.user WHERE id = ${id}`;
        return await db.connectDb(query);
    }

    static async getUserByIdItem(id, itemName, itemValue) {
        const query = `SELECT * FROM backpack2.user WHERE id = ${id} and ${itemName}=${itemValue}`;
        return await db.connectDb(query);
    }
}

module.exports = user;
