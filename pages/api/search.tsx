import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, exclude } = req.query;
  const API_URL = "https://flask-youtube-scraper-a55f990bea9f.herokuapp.com/";
  const BEARER_TOKEN = process.env.AUTH_TOKEN;

  let url = `${API_URL}/api/search?query=${encodeURIComponent(
    query as string
  )}`;
  if (exclude) {
    url += `&exclude=${encodeURIComponent(exclude as string)}`;
  }

  try {
    const apiResponse = await fetch(url, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    });
    if (!apiResponse.ok)
      throw new Error("Failed to fetch data from external API");
    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
}
