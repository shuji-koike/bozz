import config from "../config"
import { initState } from "./state"
import { listen, run } from "./daemon"

let booted = false

setTimeout(async function boot() {
  console.info("daemon: boot")
  if (booted) return
  booted = true
  try {
    await initState(config.rootDir)
    listen(config.host, config.port, "http://localhost:3000/")
    run("yarn", ["dev"], "..")
    console.info("daemon: ready")
  } catch (error) {
    console.error(error)
    return []
  }
})
