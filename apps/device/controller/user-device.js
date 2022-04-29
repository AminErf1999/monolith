const userDevice = require('../models/user-device');
const response_handler = require('../../../utils/response-handler');
const c = require('../../../utils/config');
const {existenceUser, isStaff} = require('../../user-manager/controller/user');
const {existenceDevice, isFree} = require('../../device/controller/device');

/*
** check if this user is the owner of device
 */
async function existenceUserDevice(user_id, device_id) {
    let user_device = await userDevice.getUserDevice(user_id, device_id);
    if (user_device.length < 1) {
        return false;
    }
    return true;
}

async function setDeviceToUser(req, res) {
    if (!await existenceUser(req.data.user_id) || !await existenceDevice(req.data.device_id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "user/device is not available")
    }
    if (!await isStaff(req.data.user_id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "owner is not staff")
    }
    if (!await isFree(req.data.device_id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "device is not free");
    } else {
        let info = {
            user_id: req.data.user_id,
            device_id: req.data.device_id
        };
        let user_device = new userDevice(info);
        await user_device.save(info).then((result) => console.log('save device to db'));

        response_handler.sendOk(res, 'device is set to user successfully');
    }
}

/*
** get device by its id and user
 */
async function getUserDevice(req, res) {
    if (!await existenceUser(req.data.user_id) || !await existenceDevice(req.data.device_id)) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, "user/device is not available")
    } else {
        let info = {
            user_id: req.data.user_id,
            device_id: req.data.device_id
        }
        let user_device = await userDevice.getUserDevice(info.user_id, info.device_id);
        response_handler.sendOk(res, {user_device});
    }
}

module.exports = {
    setDeviceToUser,
    getUserDevice,
    existenceUserDevice
};