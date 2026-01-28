const { readJsonFile } = require("../../utils/file.util")

async function getDealOfDayData() {
  return readJsonFile("data/v1/DealOfDay.v1.json")
}

module.exports = {
  getDealOfDayData,
}
