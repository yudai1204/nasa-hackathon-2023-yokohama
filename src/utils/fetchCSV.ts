import axios from "axios";
// 最もシンプルなCSV parse
// ダブルクォーテーションでのエスケープや行内改行を考慮せず、カンマ・改行で区切るだけ

const csvToObj = (csv: string) => {
  const lines = csv.split("\n");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [];
  const keys = lines
    .shift()
    ?.split(",")
    ?.map((key) => key.trim());
  if (lines.length < 2 || !keys) {
    throw new Error("CSV parse error");
  }
  for (const line of lines) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row: any = {};
    const values = line.split(",");
    for (const key of keys) {
      row[key] = values.shift()?.trim();
    }
    result.push(row);
  }
  return result;
};

export const csvDataFetch = async (url: string) => {
  try {
    const res = await axios.get("/api/proxy", {
      params: {
        url: url,
      },
    });
    const data = res.data;
    return csvToObj(data) as unknown[];
  } catch (e) {
    console.error(e);
    return [];
  }
};
