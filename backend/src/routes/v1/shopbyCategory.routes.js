const express = require("express")
const {
  fetchShopbyCategory,
} = require("../../controllers/v1/shopbyCategory.controller")

const router = express.Router()

router.get("/shopbyCategory", fetchShopbyCategory)

module.exports = router
