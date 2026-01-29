const express = require("express")
const { fetchBanner } = require("../../controllers/v2/banner.controller")

const router = express.Router()

router.get("/banner", fetchBanner)

module.exports = router
