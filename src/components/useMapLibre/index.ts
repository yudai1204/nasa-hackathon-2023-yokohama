import maplibregl from "maplibre-gl";
import { genQuakeSourceData } from "./moonQuake";
import type { MoonquakeData } from "@/type/moon";
import { fetchArtificialImpactCSV, fetchDeepMoonquakeCSV, fetchShallowMoonquakeCSV } from "@/utils/fetchMoonquakeCSV";

const minZoom = 3;
const maxZoom = 6;
const moonQuakeRad = 16;

type Props = {
  container: HTMLElement | null;
  latitude: number;
  longitude: number;
  zoom: number;
  setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
  setMap: React.Dispatch<React.SetStateAction<maplibregl.Map | null>>;
};
export const mapLibreLogic = (props: Props) => {
  const { container, latitude, longitude, zoom, setIsMap, setChoiceMoonquake, setMap } = props;
  if (container === null) return;
  const map = new maplibregl.Map({
    container,
    zoom,
    dragRotate: false,
    //dragPan: false,
    touchZoomRotate: false,
    minPitch: 0,
    pitchWithRotate: false,
    renderWorldCopies: false,
    style: {
      version: 8,
      // 背景地図のソースを追加
      sources: {
        "moon-tiles": {
          type: "raster",
          tiles: [
            "https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0//default/default028mm/{z}/{y}/{x}.jpg",
          ],
          tileSize: 256,
        },
        test: {
          type: "raster",
          tiles: [
            "https://trek.nasa.gov/tiles/Moon/EQ/LRO_LOLAKaguya_ClrHillshade_60N60S_512ppd/1.0.0//default/default028mm/{z}/{y}/{x}.png",
          ],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "moon-layer",
          type: "raster",
          source: "moon-tiles",
        },
        {
          id: "test-layer",
          type: "raster",
          source: "test",
          paint: {
            "raster-opacity": 0.4,
          },
        },
      ],
    },
    center: [latitude, longitude],
    minZoom,
    maxZoom,
  });

  map.on("zoom", () => {
    // console.log(map.getZoom());
    if (map.getZoom() <= minZoom) {
      console.log("minZoom");
      setIsMap(false);
      map.setZoom(minZoom + 0.5);
    }
  });

  map.on("load", async () => {
    setMap(map);
    // 月地震データを読み込む
    const shallowMoonquakes = (await fetchShallowMoonquakeCSV()) as MoonquakeData[];
    const deepMoonquakes = (await fetchDeepMoonquakeCSV()) as MoonquakeData[];
    const artificialImpacts = (await fetchArtificialImpactCSV()) as MoonquakeData[];

    map.addSource("shallow-moonquake-source", genQuakeSourceData(shallowMoonquakes));
    map.addSource("deep-moonquake-source", genQuakeSourceData(deepMoonquakes));
    map.addSource("artical-moonquake-source", genQuakeSourceData(artificialImpacts));
    map.addLayer({
      id: "shallow-moonquake-layer",
      type: "circle",
      source: "shallow-moonquake-source",
      paint: {
        "circle-radius": moonQuakeRad,
        "circle-color": "#FFA50055",
      },
    });
    map.addLayer({
      id: "deep-moonquake-layer",
      type: "circle",
      source: "deep-moonquake-source",
      paint: {
        "circle-radius": moonQuakeRad,
        "circle-color": "#ee82ee55",
      },
    });
    map.addLayer({
      id: "artical-moonquake-layer",
      type: "circle",
      source: "artical-moonquake-source",
      paint: {
        "circle-radius": moonQuakeRad,
        "circle-color": "#0000FF55",
      },
    });

    // publicディレクトリ内のGeoJSONファイルを読み込む
    const response = await fetch("/moon_place2en.geojson");
    if (!response.ok) {
      console.error("Failed to load geojson data");
      return;
    }
    const geojsonData = await response.json();

    // ソースとしてGeoJSONデータを追加
    map.addSource("geojson-source", {
      type: "geojson",
      data: geojsonData,
    });

    // GeoJSONデータを使用して新しいレイヤーを追加
    map.addLayer({
      id: "geojson-points",
      type: "circle",
      source: "geojson-source",
      paint: {
        "circle-radius": 6,
        "circle-color": "#B42222",
      },
    });

    map.on("click", "shallow-moonquake-layer", (e) => {
      const feature = e.features?.length && e.features[0];
      if (!feature) return;
      const properties = JSON.parse(feature.properties.prop);
      console.log(properties);
      setChoiceMoonquake(properties);
    });
    map.on("click", "deep-moonquake-layer", (e) => {
      const feature = e.features?.length && e.features[0];
      if (!feature) return;
      const properties = JSON.parse(feature.properties.prop);
      console.log(properties);
      setChoiceMoonquake(properties);
    });
    map.on("click", "artical-moonquake-layer", (e) => {
      const feature = e.features?.length && e.features[0];
      if (!feature) return;
      const properties = JSON.parse(feature.properties.prop);
      console.log(properties);
      setChoiceMoonquake(properties);
    });
  });

  return () => {
    map.remove();
  };
};
