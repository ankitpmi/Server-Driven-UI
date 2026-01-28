const express = require("express")
const { fetchDealOfDay } = require("../../controllers/v1/dealOfDay.controller")

const router = express.Router()

router.get("/dealOfDay", fetchDealOfDay)

module.exports = router
