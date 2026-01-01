const express = require("express")
const homeRoutes = require("./routes/home.routes")

const app = express()

app.use(express.json())

app.get("/health", (_, res) => {
  res.json({ status: "ok" })
})

app.use("/api/home", homeRoutes)

module.exports = app
