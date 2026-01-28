const { getFashionForYou } = require("../../services/v1/fashionForYou.service")

async function fetchFashionForYou(req, res) {
  const data = await getFashionForYou()

  res.json({
    success: true,
    data,
  })
}

module.exports = {
  fetchFashionForYou,
}
