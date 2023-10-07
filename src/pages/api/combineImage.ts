import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

const combineImages = async (req: NextApiRequest, res: NextApiResponse) => {
  const targetUrl = req.query.url as string;
  const sliceIdx = targetUrl.search(/\d+\/\d+\/\d+.[jpg|png]/g);
  const sliced = [targetUrl.slice(0, sliceIdx), targetUrl.slice(sliceIdx)];
  const [z, y, x] = sliced[1].match(/\d+/g) || [0, 0, 0];
  const filetype = sliced[1].slice(-3);

  try {
    const image1Url = "https://" + sliced[0] + `${z}/${y}/${Number(x) * 2}.${filetype}`;
    const image2Url = "https://" + sliced[0] + `${z}/${y}/${Number(x) * 2 + 1}.${filetype}`;

    const image1Response = await axios.get(image1Url, { responseType: "arraybuffer" });
    const image2Response = await axios.get(image2Url, { responseType: "arraybuffer" });

    const image1 = sharp(Buffer.from(image1Response.data));
    const image2 = sharp(Buffer.from(image2Response.data));

    const image1Info = await image1.metadata();
    const image2Info = await image2.metadata();

    const image2Resized = await image2.resize(undefined, image1Info.height).toBuffer();

    const combinedImageBuffer = await image1
      .extend({
        top: 0,
        bottom: 0,
        left: 0,
        right: image2Info.width,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .composite([
        {
          input: image2Resized,
          left: image1Info.width,
          top: 0,
        },
      ])
      .toBuffer();

    // 横方向を1/2に圧縮（高さはそのまま）
    const compressedImageBuffer = await sharp(combinedImageBuffer)
      .resize(image1Info.height, image1Info.height, { fit: "fill" })
      .toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(compressedImageBuffer);
  } catch (error) {
    console.error("Error combining images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default combineImages;
