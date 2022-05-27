const userCtrl = require("./controller/user");
const authenticationController = require("./controller/auth");
const dataParser = require("backpack2-data-parser");
const { verifyToken } = require("./middlewares/authentication");
// const {isAdmin} = require('./middlewares/authorization');
const {
  isNullId,
  isNullFields,
  duplicateUsername,
  isValidateRole,
} = require("./middlewares/signup");

module.exports = {
  "/users": {
    GET: {
      function: userCtrl.getAllUsers,
      middlewares: [verifyToken],
    },
  },

  "/user": {
    POST: {
      function: userCtrl.createUser,
      middlewares: [
        dataParser,
        verifyToken,
        isNullFields,
        isValidateRole,
        duplicateUsername,
      ],
    },
    GET: {
      function: userCtrl.getUserById,
      middlewares: [dataParser, verifyToken, isNullId],
    },
  },

  "/login": {
    POST: {
      function: authenticationController.login,
      middlewares: [dataParser, isNullFields],
    },
  },
};
