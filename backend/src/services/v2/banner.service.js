const { getBannerData } = require("../../db/v2/banner.db")

async function getBanner() {
  const data = await getBannerData()

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
