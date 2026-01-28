const {
  getShopbyCategory,
} = require("../../services/v1/shopbyCategory.service")

async function fetchShopbyCategory(req, res) {
  const data = await getShopbyCategory()

  res.json({
    success: true,
    data,
  })
}

module.exports = {
  fetchShopbyCategory,
}
