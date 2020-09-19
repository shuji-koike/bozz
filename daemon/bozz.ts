import { Request, Router } from "express"
import parseDiff from "parse-diff"
import { commits, diffs } from "./git"
import { getState } from "./state"

export const router = Router()

interface BozzCommits {
  path: string
  ref: string
}

router.post(
  "/.bozz/commits",
  async (req: Request<{}, GitCommit[], BozzCommits>, res) => {
    console.debug("bozz:", req.url, req.body)
    res.send(await commits(req.body.path, req.body.ref))
  }
)

router.post(
  "/.bozz/diffs",
  async (req: Request<{}, parseDiff.File[], BozzCommits>, res) => {
    console.debug("bozz:", req.url, req.body)
    res.send(await diffs(req.body.path, req.body.ref))
  }
)

router.get("/.bozz", async (req, res) => {
  console.debug("bozz:", req.url)
  res.send(await getState())
})
