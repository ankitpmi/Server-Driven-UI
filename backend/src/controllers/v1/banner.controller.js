const { getBanner } = require("../../services/v1/banner.service")

async function fetchBanner(req, res) {
  const data = await getBanner()

  res.json({
    success: true,
    data,
  })
}

module.exports = {
  fetchBanner,
}
