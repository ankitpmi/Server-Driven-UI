const { readJsonFile } = require("../utils/file.util")

async function getHomeData() {
  return readJsonFile("data/home.json")
}

module.exports = {
  getHomeData,
}
