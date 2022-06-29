const axios = require("axios");

async function existenceUserDevice(data) {
  try {
    const user = await axios({
      method: "POST",
      url: `http://127.0.0.1:3000/get-user-device`,
      data,
      headers: req.headers,
    });
    return user ? true : false;
  } catch (error) {
    console.log(error);
  }
}

async function existenceDevice(id) {
  try {
    const user = await axios({
      method: "GET",
      url: `http://127.0.0.1:3001/device?id=${id}`,
      headers: req.headers,
    });
    return user ? true : false;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  existenceUserDevice,
  existenceDevice,
};
