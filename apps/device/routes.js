const deviceCtrl = require('./controller/device');
const userDeviceCtrl = require('./controller/user-device');
const {verifyToken} = require('../user-manager/middlewares/authentication');
const {isAdmin, isSupporter} = require('../user-manager/middlewares/authorization');
const {isNullId, isNullFieldsDevice, isNullSetDeviceToUser} = require('./middlewares/device');
const dataParser = require('backpack2-data-parser');


module.exports = {
    '/devices': {
        GET: {
            function: deviceCtrl.getAllDevices,
            middlewares: [verifyToken, isSupporter]
        },
    },

    '/device': {
        GET: {
            function: deviceCtrl.getDeviceById,
            middlewares: [dataParser, isNullId, verifyToken, isSupporter]
        },
        POST: {
            function: deviceCtrl.createDevice,
            middlewares: [verifyToken, dataParser, isNullFieldsDevice, isSupporter]

        }
    },

    '/set-device-to-user': {
        POST: {
            function: userDeviceCtrl.setDeviceToUser,
            middlewares: [verifyToken, dataParser, isNullSetDeviceToUser, isSupporter]
        }
    },

    '/get-user-device': {
        GET: {
            function: userDeviceCtrl.getUserDevice,
            middlewares: [verifyToken, dataParser, isNullSetDeviceToUser, isSupporter]
        }
    },

    '/set-device-free': {
        POST: {
            function: deviceCtrl.setFree,
            middlewares: [dataParser, isNullId, verifyToken, isSupporter]
        }
    },

}

