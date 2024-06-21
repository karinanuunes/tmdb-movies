import type { NextApiRequest, NextApiResponse } from "next";
import { fetchGenres } from "@/utils/fetchGenres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const genres = await fetchGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch genres" });
  }
}
