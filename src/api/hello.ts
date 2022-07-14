import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   res.status(200).json({ text: "Hello" });
// };

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `https://v3.football.api-sports.io/players?league=39&season=2021&team=50`
  const { data } = await axios.get(URL)
  res.status(200).json({ articles: data })
}