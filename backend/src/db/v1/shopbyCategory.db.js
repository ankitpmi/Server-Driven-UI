const { readJsonFile } = require("../../utils/file.util")

async function getShopbyCategoryData() {
  return readJsonFile("data/v1/ShopByCategory.v1.json")
}

module.exports = {
  getShopbyCategoryData,
}
