const { getShopbyCategoryData } = require("../../db/v1/shopbyCategory.db")

async function getShopbyCategory() {
  const data = await getShopbyCategoryData()

  return {
    metaData: data.metaData,
    payload: {
      ...data.data,
    },
  }
}

module.exports = {
  getShopbyCategory,
}
