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
            // "http://localhost:3000/api/combineImage?url=tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0//default/default028mm/{z}/{y}/{x}.jpg",
            // "https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0//default/default028mm/{z}/{y}/{x}.jpg",
          ],
          tileSize: 256,
        },
        test: {
          type: "raster",
          tiles: [
            "http://localhost:3000/api/combineImage?url=tiles/Moon/EQ/LRO_DIVINER_ClrRockFreeSurfaceTemp_Global_128ppd/1.0.0//default/default028mm/{z}/{y}/{x}.png",
            // "https://trek.nasa.gov/tiles/Moon/EQ/Apollo15_MetricCam_ClrConf_Global_1024ppd/1.0.0//default/default028mm/{z}/{y}/{x}.png",
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
        {
          id: "test-layer",
          type: "raster",
          source: "test",
        },
      ],
    },
    center: [latitude, longitude], // 月の中心
    minZoom: 0,
    maxZoom: 9,
  });

  map.on("click", "points-layer", (e) => {
    console.log(e);
  });

  return () => {
    map.remove();
  };
};
