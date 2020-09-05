import express from "express"
import config from "../config"
import { initState, getState } from "./state"

let booted = false

boot()

export async function boot() {
  if (booted) return
  booted = true
  console.info("boot")
  try {
    return Promise.all([
      initState(config.rootDir),
      listen(config.host, config.port),
    ])
  } catch (error) {
    console.error(error)
    return []
  }
}

async function listen(host: string, port: number) {
  const app = express()
  app.set("json spaces", 2)
  app.use("/.bozz", (req, res) => {
    console.info(req.url)
    res.send(getState())
  })
  app.use((req, res) => {
    console.info(req.url)
    res.send("ok")
  })
  app.listen(port, host)
  console.info(`http://${host}:${port}/`)
}
