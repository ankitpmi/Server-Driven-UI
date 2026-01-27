const { getHome } = require("../../services/v1/home.service")

async function fetchHome(req, res) {
  const { festival = "default" } = req.query
  const data = await getHome(festival)

  res.json({
    success: true,
    data,
  })
}

module.exports = {
  fetchHome,
}
