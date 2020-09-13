import { readFileSync } from "fs"
import { boot } from "./daemon"

export const config = JSON.parse(readFileSync("../config.json").toString())

boot(config)
