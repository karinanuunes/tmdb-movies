import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPeople } from "@/utils/fetchPeople";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const people = await fetchPeople();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch people" });
  }
}
