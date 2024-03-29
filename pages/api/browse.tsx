import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("publishTime", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch data from Supabase" });
  }

  res.status(200).json(data);
}
