const express = require("express")
const { fetchHome } = require("../controllers/home.controller")

const router = express.Router()

router.get("/", fetchHome)

module.exports = router
