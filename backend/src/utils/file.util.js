const fs = require("fs/promises")
const path = require("path")

const ROOT_DIR = process.cwd()

async function readJsonFile(relativePath) {
  const filePath = path.join(ROOT_DIR, relativePath)
  const content = await fs.readFile(filePath, "utf-8")
  return JSON.parse(content)
}

module.exports = {
  readJsonFile,
}
