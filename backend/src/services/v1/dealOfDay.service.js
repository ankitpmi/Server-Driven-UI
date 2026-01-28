const { getDealOfDayData } = require("../../db/v1/dealOfDay.db")

async function getDealOfDay() {
  const data = await getDealOfDayData()
  console.log("data: ", data)

  return {
    metaData: data.metaData,
    payload: {
      ...data.data,
    },
  }
}

module.exports = {
  getDealOfDay,
}
