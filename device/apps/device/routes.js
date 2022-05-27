const deviceCtrl = require("./controller/device");
const userDeviceCtrl = require("./controller/user-device");
const {
  isNullId,
  isNullFieldsDevice,
  isNullSetDeviceToUser,
} = require("./middlewares/device");
const dataParser = require("backpack2-data-parser");
const { verifyToken } = require("./middlewares/authentication");

module.exports = {
  "/devices": {
    GET: {
      function: deviceCtrl.getAllDevices,
      middlewares: [verifyToken],
    },
  },

  "/device": {
    GET: {
      function: deviceCtrl.getDeviceById,
      middlewares: [dataParser, isNullId, verifyToken],
    },
    POST: {
      function: deviceCtrl.createDevice,
      middlewares: [verifyToken, dataParser, isNullFieldsDevice],
    },
  },

  "/set-device-to-user": {
    POST: {
      function: userDeviceCtrl.setDeviceToUser,
      middlewares: [verifyToken, dataParser, isNullSetDeviceToUser],
    },
  },

  "/get-user-device": {
    GET: {
      function: userDeviceCtrl.getUserDevice,
      middlewares: [verifyToken, dataParser, isNullSetDeviceToUser],
    },
  },

  "/set-device-free": {
    POST: {
      function: deviceCtrl.setFree,
      middlewares: [dataParser, isNullId, verifyToken],
    },
  },
};
