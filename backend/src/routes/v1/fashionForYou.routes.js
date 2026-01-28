const express = require("express")
const {
  fetchFashionForYou,
} = require("../../controllers/v1/fashionForYou.controller")

const router = express.Router()

router.get("/fashionForYou", fetchFashionForYou)

module.exports = router
