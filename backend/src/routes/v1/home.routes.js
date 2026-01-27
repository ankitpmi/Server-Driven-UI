const express = require("express")
const { fetchHome } = require("../../controllers/v1/home.controller")

const router = express.Router()

router.get("/home", fetchHome)

module.exports = router
