const db = require("../../../database/database");

class userDevice {
  constructor(userDevice) {
    this.id = userDevice.id || "";
    this.user_id = userDevice.name || "";
    this.device_id = userDevice.brand || "";
  }

  async save(info_device) {
    let a = JSON.stringify(Object.values(info_device));
    const query = `INSERT INTO public."user_device" (user_id, device_id) values
        (${a.slice(1, -1).replace(/"/g, "'")})`;
    await db.connectDb(query);
    const update = `UPDATE public."device" SET is_free=False WHERE id = ${info_device.device_id}`;
    return await db.connectDb(update);
  }

  /*
   ** get user's devices
   */
  static async getUserDevices(id) {
    const query = `SELECT * FROM public."user_device"  WHERE user_id = ${id}`;
    return await db.connectDb(query);
  }

  /*
   ** get users of a device(device log)
   */
  static async getDeviceUsers(id) {
    const query = `SELECT * FROM public."user_device"  WHERE device_id = ${id}`;
    return await db.connectDb(query);
  }

  /*
   ** get device by its id and user
   */
  static async getUserDevice(user_id, device_id) {
    const query = `SELECT * FROM public."user_device"  WHERE user_id = ${user_id} AND device_id = ${device_id}`;
    return await db.connectDb(query);
  }

  static async getDeviceById(id) {
    const query = `SELECT * FROM public."user_device"  WHERE id = ${id}`;
    return await db.connectDb(query);
  }
}

module.exports = userDevice;
