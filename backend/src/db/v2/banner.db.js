const { readJsonFile } = require("../../utils/file.util")

async function getBannerData() {
  return readJsonFile("data/v2/banner.v2.json")
}

module.exports = {
  getBannerData,
}
