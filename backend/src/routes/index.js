const express = require("express")
const router = express.Router()

const v1HomeRoutes = require("./v1/home.routes")
const v1BannerRoutes = require("./v1/banner.routes")
// const v2Routes = require("./v2/home.routes")

router.use("/v1", v1HomeRoutes)
router.use("/v1", v1BannerRoutes)
// router.use("/v2", v2Routes)

module.exports = router
