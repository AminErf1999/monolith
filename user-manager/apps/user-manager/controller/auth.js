const modelUser = require("../models/auth");
const jwt = require("../utils/jwt");
const c = require("../../../utils/config");
const response_handler = require("../../../utils/response-handler");
const bcrypt = require("bcrypt");

async function login(req, res) {
  let user = await modelUser.getUserByItem("username", req.data.username);
  console.log("user");
  console.log(user);

  const credentials = {
    username: user[0].username,
    password: user[0].password,
  };
  const { username, password } = req.data;

  if (!(username && password)) {
    return response_handler.sendFail(res, c.statusCodes.UNAUTHORIZED, {
      message: c.messages.loginFailed,
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  if (
    username !== credentials.username ||
    (await bcrypt.compare(encryptedPassword, credentials.password))
  ) {
    return response_handler.sendFail(res, c.statusCodes.UNAUTHORIZED, {
      message: c.messages.loginFailed,
    });
  }
  const token = jwt.sign({ user_id: user[0].id, role: user[0].role });
  user[0].token = token;
  response_handler.sendOk(res, user[0].token);
}

module.exports = {
  login,
};
