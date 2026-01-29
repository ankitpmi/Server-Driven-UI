const express = require("express")
const router = express.Router()

const v1HomeRoutes = require("./v1/home.routes")
const v1BannerRoutes = require("./v1/banner.routes")
const v1DealOfDayRoutes = require("./v1/dealOfDay.routes")
const v1ShopbyCategoryRoutes = require("./v1/shopbyCategory.routes")
const v1FashionForYouRoutes = require("./v1/fashionForYou.routes")
// const v2Routes = require("./v2/home.routes")

const v2BannerRoutes = require("./v2/banner.routes")

router.use("/v1", v1HomeRoutes)
router.use("/v1", v1BannerRoutes)
router.use("/v1", v1DealOfDayRoutes)
router.use("/v1", v1ShopbyCategoryRoutes)
router.use("/v1", v1FashionForYouRoutes)

router.use("/v2", v2BannerRoutes)

// router.use("/v2", v2Routes)

module.exports = router
