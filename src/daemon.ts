import express from "express"
import config from "../config"
import { initState, getState } from "./state"

export async function boot() {
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
  app.use((req, res) => {
    console.info(req.url)
    res.send(getState())
  })
  app.listen(port, host)
  console.info(`http://${host}:${port}/`)
}
