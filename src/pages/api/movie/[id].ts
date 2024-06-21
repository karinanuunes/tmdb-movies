import type { NextApiRequest, NextApiResponse } from "next";
import { fetchMovie } from "@/utils/fetchMovie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid movie ID" });
    return;
  }

  try {
    const movie = await fetchMovie(id);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
}
