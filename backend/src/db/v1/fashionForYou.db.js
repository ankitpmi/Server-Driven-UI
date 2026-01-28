const { readJsonFile } = require("../../utils/file.util")

async function getFashionForYouData() {
  return readJsonFile("data/v1/fashionForYou.v1.json")
}

module.exports = {
  getFashionForYouData,
}
