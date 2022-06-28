const User = require("../models/user");
const bcrypt = require("bcrypt");
const response_handler = require("../../../utils/response-handler");

async function existenceUser(user_id) {
  let user = await User.getUserById(user_id);
  if (user.length < 1) {
    return false;
  }
  return true;
}

async function isStaff(user_id) {
  let user = await User.getUserByIdItem(user_id, "role", 3);
  if (user.length < 1) {
    return false;
  }
  return true;
}

async function createUser(req, res) {
  const encryptedPassword = await bcrypt.hash(req.data.password, 10);
  let info = {
    username: req.data.username,
    password: encryptedPassword,
    role: req.data.role,
  };
  let user = new User(info);
  await user.save(info).then((result) => console.log("save to db"));

  response_handler.sendOk(res, "user created successfully");
}

async function getAllUsers(req, res) {
  let users = await User.getAllUsers();
  response_handler.sendOk(res, { users });
}

async function getUserById(req, res) {
  console.log("Im called!");
  let user = await User.getUserById(req.data.id);
  response_handler.sendOk(res, { user });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  existenceUser,
  isStaff, // someone who his role is 3
};
