// import { getHomeData } from "../repositories/home.repo.js"
const { getHomeData } = require("../repositories/home.repo")

async function getHome(festival = "default") {
  const data = await getHomeData()

  const sections = data.sections
    .filter(
      (s) => s.active && (s.festival === festival || s.festival === "default"),
    )
    .sort((a, b) => a.order - b.order)

  return {
    designTokens: data.designTokens,
    screen: data.screen,
    sections,
  }
}

module.exports = {
  getHome,
}
