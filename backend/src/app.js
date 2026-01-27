const express = require("express")

const apiRoutes = require("./routes")

const app = express()

app.use(express.json())

app.get("/health", (_, res) => {
  res.json({ status: "ok" })
})

app.use("/api", apiRoutes)

module.exports = app
