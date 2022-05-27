const response_handler = require('../../../utils/response-handler');
const c = require('../../../utils/config');


module.exports.isNullFieldsDevice = (req, res, next) => {
    const name = req.data.name;
    const brand = req.data.brand;
    if (!name || !brand) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'name and brand is required');
    } else return next();
}

module.exports.isNullSetDeviceToUser = (req, res, next) => {
    const user_id = req.data.user_id;
    const device_id = req.data.device_id;
    if (!user_id || !device_id) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'device_id and user_id are required');
    } else return next();
}

module.exports.isNullId = (req, res, next) => {
    const id = req.data.id;
    if (!id) {
        response_handler.sendFail(res, c.statusCodes.BAD_REQUEST, 'id is required');
    } else return next();
}
