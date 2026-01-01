import { getHome } from "../services/home.service.js"

export async function fetchHome(req, res) {
  const { festival = "default" } = req.query
  const data = await getHome(festival)

  res.json({
    success: true,
    data,
  })
}
