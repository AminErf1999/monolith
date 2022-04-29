const db = require('../../../database/database')

class device {
    constructor(device) {
        this.id = device.id || '';
        this.name = device.name || '';
        this.brand = device.brand || '';
        this.is_free = device.is_free || '';
    }

    async save(info_device) {
        let a = JSON.stringify(Object.values(info_device));
        const query = `INSERT INTO backpack2.device(name, brand, is_free) values
        (${a.slice(1, -1).replace(/"/g, "'")})`;
        return await db.connectDb(query);
    }

    static async getAllDevices() {
        const query = `SELECT * FROM backpack2.device`;
        return await db.connectDb(query);
    }

    static async getDeviceById(id){
        const query = `SELECT * FROM backpack2.device WHERE id = ${id}`;
        return await db.connectDb(query);
    }

    static async isFree(id){
        const query = `SELECT * FROM backpack2.device WHERE id = ${id} AND is_free = true`;
        return await db.connectDb(query);
    }

    static async setFree(id){
        const query = `UPDATE backpack2.device SET is_free = true WHERE id = ${id}`;
        return await db.connectDb(query);
    }


}

module.exports = device;
