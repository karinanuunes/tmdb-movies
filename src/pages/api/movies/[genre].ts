import type { NextApiRequest, NextApiResponse } from "next";
import { fetchMovies } from "@/utils/fetchMovies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const genreId = parseInt(req.query.id as string);

  if (isNaN(genreId)) {
    res.status(400).json({ error: "Invalid genre ID" });
    return;
  }

  try {
    const movies = await fetchMovies(1);
    res.status(200).json({ results: movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}
