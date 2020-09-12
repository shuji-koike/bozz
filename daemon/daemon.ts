import http from "http"
import express from "express"
import { createProxyServer } from "http-proxy"
import { initState, getState } from "./state"
import { run } from "./util"

let booted = false

export async function boot(config: Config) {
  console.info("daemon: boot")
  if (booted) return
  booted = true
  await initState(config.rootDir)
  start(config, "http://localhost:3000/")
  console.info("daemon: ready")
  process.on("SIGTERM", () => console.info("daemon: SIGTERM"))
}

export function start({ port, host }: Config, target: string) {
  const app = express()
  app.use(express.json())
  app.set("json spaces", 2)
  app.use("/.bozz", (req, res) => {
    console.debug("bozz", req.url, req.body)
    res.send(getState())
  })
  app.use((req, res) => {
    console.debug("proxy:", target, req.url)
    proxy.web(req, res, { target }, error => {
      console.warn(error.message)
      run("yarn", ["dev"])
      res.send("proxy error")
    })
  })
  const proxy = createProxyServer({
    target,
    ws: true,
    xfwd: true,
    changeOrigin: true,
    autoRewrite: true,
    timeout: 3e3,
  })
  proxy.on("error", e => console.error(e))
  const server = http.createServer(app)
  server.on("upgrade", proxy.ws.bind(proxy))
  server.listen(port, host)
  console.info("listen:", `http://${host}:${port}/`)
  const close = () => [proxy, server].forEach(e => e.close())
  process.on("SIGTERM", close)
  return close
}
