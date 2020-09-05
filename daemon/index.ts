import express from "express"
import config from "../config"
import { initState, getState } from "./state"
import { createProxyServer } from "http-proxy"

let booted = false

var proxy = createProxyServer({
  ws: true,
  xfwd: true,
  changeOrigin: true,
  autoRewrite: true,
})
proxy.on("error", e => console.error(e))

boot()

export async function boot() {
  console.info("daemon: boot")
  if (booted) return
  booted = true
  try {
    await Promise.all([
      initState(config.rootDir),
      listen(config.host, config.port),
    ])
    console.info("booted: ready")
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
    const target = "http://127.0.0.1:3000/"
    console.debug("proxy:", target, req.url)
    proxy.web(req, res, { target })
  })
  app.listen(port, host)
  console.info(`http://${host}:${port}/`)
}
