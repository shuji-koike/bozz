import express from "express"
import config from "../config"
import { initState, getState } from "./state"
import { createProxyServer } from "http-proxy"
import execa from "execa"

let booted = false

var proxy = createProxyServer({
  ws: true,
  xfwd: true,
  changeOrigin: true,
  autoRewrite: true,
  timeout: 10e3,
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
      run("yarn", ["dev"], "/Users/shuji/github.com/shuji-koike/bozz"),
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

function run(command: string, args: string[] = [], path?: string) {
  const proc = execa(command, args, {
    cwd: path,
  })
  proc.stdout && proc.stdout.pipe(process.stdout)
  proc.stderr && proc.stderr.pipe(process.stderr)
  return proc
}
