import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { videoId } = req.body;
  if (!videoId) {
    return res.status(400).json({ error: "Video ID is required" });
  }

  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data, error } = await supabase
    .from("videos")
    .delete()
    .match({ videoId });

  if (error) {
    console.error("Error deleting data:", error);
    return res
      .status(500)
      .json({ error: "Failed to delete data from Supabase" });
  }

  res.status(200).json(data);
}
