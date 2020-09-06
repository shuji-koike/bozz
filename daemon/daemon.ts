import express from "express"
import { getState } from "./state"
import { createProxyServer } from "http-proxy"
import execa from "execa"
import http from "http"

const proxy = createProxyServer({
  target: "http://localhost:3000/",
  ws: true,
  xfwd: true,
  changeOrigin: true,
  autoRewrite: true,
  timeout: 3e3,
})
proxy.on("error", e => console.error(e))

export function listen(host: string, port: number) {
  const app = express()
  app.set("json spaces", 2)
  app.get("/.bozz", (req, res) => {
    console.info(req.url)
    res.send(getState())
  })
  app.use((req, res) => {
    const target = resolveProxyTarget(req.url)
    console.debug("proxy:", target, req.url)
    proxy.web(req, res, { target }, error => {
      console.warn(error.message)
      res.send("error")
    })
  })
  const server = http.createServer(app)
  server.on("upgrade", proxy.ws.bind(proxy))
  server.listen(port, host)
  process.on("SIGTERM", () => server.close())
  console.info("listen:", `http://${host}:${port}/`)
}

function resolveProxyTarget(url: string) {
  return "http://127.0.0.1:3000/"
}

export function run(command: string, args: string[] = [], cwd?: string) {
  const proc = execa(command, args, {
    cwd,
    detached: true,
  })
  // proc.stdout && proc.stdout.pipe(process.stdout)
  // proc.stderr && proc.stderr.pipe(process.stderr)
  process.on("SIGTERM", () => proc.kill("SIGTERM"))
}
