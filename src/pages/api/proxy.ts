import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const targetUrl = req.query.url as string;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing target URL" });
  }

  console.log(`Proxying request to ${targetUrl}`);

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        ...req.headers,
        Host: "pds-geosciences.wustl.edu",
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("ERROR OCURED", error);
    return res.status(500).json({ error: "An error occurred while proxying the request" });
  }
}
