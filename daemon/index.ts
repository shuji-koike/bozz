import { boot } from "./daemon"
import { readFileSync } from "fs"

export const config = JSON.parse(readFileSync("../config.json").toString())

boot(config)
