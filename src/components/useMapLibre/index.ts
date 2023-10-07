import maplibregl from "maplibre-gl";

type Props = {
  container: HTMLElement | null;
  latitude: number;
  longitude: number;
  zoom: number;
};
export const mapLibreLogic = (props: Props) => {
  const { container, latitude, longitude, zoom } = props;
  if (container === null) return;
  const map = new maplibregl.Map({
    container,
    zoom,
    style: {
      version: 8,
      // 背景地図のソースを追加
      sources: {
        "moon-tiles": {
          type: "raster",
          tiles: [
            "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
        },
      },
      layers: [
        {
          // 背景地図のレイヤーを追加
          id: "moon-layer", // レイヤーID
          type: "raster", // レイヤータイプ
          source: "moon-tiles", // ソースID
        },
      ],
    },
    center: [latitude, longitude], // 月の中心
    minZoom: 1,
    maxZoom: 9,
  });

  map.on("click", "points-layer", (e) => {
    console.log(e);
  });

  return () => {
    map.remove();
  };
};
