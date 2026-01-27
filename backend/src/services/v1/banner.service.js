const { getBannerData } = require("../../db/v1/banner.db")

async function getBanner() {
  const data = await getBannerData()
  console.log("data: ", data)

  return {
    metaData: data.metaData,
    payload: {
      ...data.data,
    },
  }
}

module.exports = {
  getBanner,
}
