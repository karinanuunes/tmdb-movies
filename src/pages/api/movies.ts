import type { NextApiRequest, NextApiResponse } from "next";
import { fetchMovies } from "@/utils/fetchMovies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;

  try {
    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const movies = await fetchMovies(pageNumber);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}
