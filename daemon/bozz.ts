import { Router } from "express"
import { getState } from "./state"

export const router = Router()

router.use("/.bozz", async (req, res) => {
  console.debug("bozz", req.url, req.body)
  res.send(await getState())
})
