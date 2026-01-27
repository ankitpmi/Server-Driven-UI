const { readJsonFile } = require("../../utils/file.util")

async function getBannerData() {
  return readJsonFile("data/v1/banner.v1.json")
}

module.exports = {
  getBannerData,
}
