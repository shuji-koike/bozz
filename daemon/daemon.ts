import http from "http"
import execa from "execa"
import express from "express"
import { createProxyServer } from "http-proxy"
import { getState } from "./state"

export function listen(host: string, port: number, target: string) {
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
      res.send("proxy error")
    })
  })
  const server = http.createServer(app)
  const proxy = createProxyServer(proxyServerConfig(target))
  proxy.on("error", e => console.error(e))
  server.on("upgrade", proxy.ws.bind(proxy))
  server.listen(port, host)
  process.on("SIGTERM", () => server.close())
  console.info("listen:", `http://${host}:${port}/`)
}

function proxyServerConfig(target: string) {
  return {
    target,
    ws: true,
    xfwd: true,
    changeOrigin: true,
    autoRewrite: true,
    timeout: 3e3,
  }
}

export function run(command: string, args: string[] = [], cwd?: string) {
  const proc = execa(command, args, {
    cwd,
    detached: true,
  })
  process.on("SIGTERM", () => proc.kill("SIGTERM"))
}
