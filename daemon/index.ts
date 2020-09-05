import express from "express"
import config from "../config"
import { initState, getState } from "./state"
import { createProxyServer } from "http-proxy"
import execa from "execa"

let booted = false

const procList: execa.ExecaChildProcess[] = []

const proxy = createProxyServer({
  ws: true,
  xfwd: true,
  changeOrigin: true,
  autoRewrite: true,
  timeout: 3e3,
})
proxy.on("error", e => console.error(e))

process.on("SIGTERM", () => {
  console.log(
    "procList: ",
    procList.map(e => e.pid)
  )
  for (const proc of procList) proc.kill("SIGTERM")
})

setTimeout(async function boot() {
  console.info("daemon: boot")
  if (booted) return
  booted = true
  try {
    await Promise.all([
      initState(config.rootDir),
      listen(config.host, config.port),
      run("yarn", ["dev"], ".."),
    ])
    console.info("booted: ready")
  } catch (error) {
    console.error(error)
    return []
  }
})

async function listen(host: string, port: number) {
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
      res.redirect("/.bozz")
    })
  })
  app.listen(port, host)
  console.info("listen:2", `http://${host}:${port}/`)
}

function resolveProxyTarget(url: string) {
  return "http://127.0.0.1:3000/"
}

function run(command: string, args: string[] = [], cwd?: string) {
  const proc = execa(command, args, {
    cwd,
    detached: true,
  })
  // proc.stdout && proc.stdout.pipe(process.stdout)
  // proc.stderr && proc.stderr.pipe(process.stderr)
  procList.push(proc)
}
