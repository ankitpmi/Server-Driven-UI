const { getDealOfDay } = require("../../services/v1/dealOfDay.service")

async function fetchDealOfDay(req, res) {
  const data = await getDealOfDay()

  res.json({
    success: true,
    data,
  })
}

module.exports = {
  fetchDealOfDay,
}
