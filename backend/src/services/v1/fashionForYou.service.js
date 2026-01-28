const { getFashionForYouData } = require("../../db/v1/fashionForYou.db")

async function getFashionForYou() {
  const data = await getFashionForYouData()

  return {
    metaData: data.metaData,
    payload: {
      ...data.data,
    },
  }
}

module.exports = {
  getFashionForYou,
}
