const axios = require("axios");

async function existenceUser(req) {
  try {
    const user = await axios({
      method: "get",
      url: `http://127.0.0.1:3000/user?id=${req.data.user_id}`,
      headers: req.headers,
    });
    return user ? true : false;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  existenceUser,
};
