const { readJSON } = require("../utils/file.util")

function getHomeData() {
  return readJSON("data/home.json")
}

module.exports = {
  getHomeData,
}
