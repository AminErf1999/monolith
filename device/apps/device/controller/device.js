const Device = require("../models/device");
const response_handler = require("../../../utils/response-handler");

async function existenceDevice(device_id) {
  let device = await Device.getDeviceById(device_id);
  if (device.length < 1) {
    return false;
  }
  return true;
}

async function isFree(device_id) {
  let is_free = await Device.isFree(device_id);
  if (is_free.length < 1) {
    return false;
  }
  return true;
}

async function createDevice(req, res) {
  let info = {
    name: req.data.name,
    brand: req.data.brand,
    is_free: req.data.is_free || true,
  };
  let device = new Device(info);
  await device.save(info).then((result) => console.log("save device to db"));

  response_handler.sendOk(res, "device created successfully");
}

async function getAllDevices(req, res) {
  let devices = await Device.getAllDevices();
  response_handler.sendOk(res, { devices });
}

async function getDeviceById(req, res) {
  let device = await Device.getDeviceById(req.data.id);
  response_handler.sendOk(res, { device });
}

async function setFree(req, res) {
  let device = await Device.setFree(req.data.id);
  response_handler.sendOk(res, "device is free now.");
}

module.exports = {
  createDevice,
  getAllDevices,
  getDeviceById,
  existenceDevice,
  isFree,
  setFree,
};
