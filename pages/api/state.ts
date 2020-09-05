import { NextApiRequest, NextApiResponse } from "next"
import config from "~/config"
import { initState, getState } from "~/daemon/state"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.debug(req.url)
  await initState(config.rootDir)
  res.statusCode = 200
  res.json(getState())
}
