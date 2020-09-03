import { NextApiRequest, NextApiResponse } from "next"
import config from "~/config"
import { initState, getState } from "~/src/state"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await initState(config.rootDir)
  res.statusCode = 200
  res.json(getState())
}
