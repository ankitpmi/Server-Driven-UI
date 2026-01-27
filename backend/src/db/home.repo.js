const { readJsonFile } = require("../utils/file.util")

async function getHomeData() {
  return readJsonFile("data/v1/home.v1.json")
}

module.exports = {
  getHomeData,
}
