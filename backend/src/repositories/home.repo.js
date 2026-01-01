import { readJsonFile } from "../utils/file.util.js"

export async function getHomeData() {
  return readJsonFile("data/home.json")
}
