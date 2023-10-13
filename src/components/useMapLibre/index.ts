import maplibregl from "maplibre-gl";
import { genQuakeSourceData } from "./moonQuake";
import type { LngLat, MoonquakeData, Option } from "@/type";
import { fetchArtificialImpactCSV, fetchDeepMoonquakeCSV, fetchShallowMoonquakeCSV } from "@/utils/fetchMoonquakeCSV";
import { filterMoonQuake } from "@/utils/filterMoonquake";

const minZoom = 3;
const maxZoom = 8;
const moonQuakeRad = 16;

const layerMaps = [
  "https://trek.nasa.gov/tiles/Moon/EQ/LRO_LOLAKaguya_ClrHillshade_60N60S_512ppd/1.0.0//default/default028mm/{z}/{y}/{x}.png",
  "https://trek.nasa.gov/tiles/Moon/EQ/Kaguya_LGM2011_FreeairGravity_Colorized_Global_mgal3m_20ppd/1.0.0//default/default028mm/{z}/{y}/{x}.png",
  "https://trek.nasa.gov/tiles/Moon/EQ/gggrx_1200a_boug_l180.eq/1.0.0//default/default028mm/{z}/{y}/{x}.png",
  "https://trek.nasa.gov/tiles/Moon/EQ/Model1_cmi.eq/1.0.0//default/default028mm/{z}/{y}/{x}.png",
];

type Props = {
  container: HTMLElement | null;
  latitude: number;
  longitude: number;
  zoom: number;
  setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
  setLngLats: React.Dispatch<React.SetStateAction<[LngLat, LngLat]>>;
  option: Option;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast: any;
};
export const mapLibreLogic = (props: Props) => {
  const { container, latitude, longitude, zoom, setIsMap, setChoiceMoonquake, setLngLats, option, toast } = props;
  if (container === null) return;
  const map = new maplibregl.Map({
    container,
    zoom,
    dragRotate: false,
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
          tiles: [layerMaps[option.layerIdx]],
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
            "raster-opacity": option.displayLayer ? option.layerOpacity : 0,
          },
        },
      ],
      glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    },
    center: [latitude, longitude],
    minZoom,
    maxZoom,
  });

  map.touchZoomRotate.disableRotation();

  map.on("zoom", () => {
    // console.log(map.getZoom());
    if (map.getZoom() <= minZoom) {
      console.log("minZoom");
      setIsMap(false);
      map.setZoom(minZoom + 0.5);
    }
  });

  map.on("load", async () => {
    // 月地震データを読み込む
    const shallowMoonquakes = filterMoonQuake(await fetchShallowMoonquakeCSV(), option);
    const deepMoonquakes = filterMoonQuake(await fetchDeepMoonquakeCSV(), option);
    const artificialImpacts = filterMoonQuake(await fetchArtificialImpactCSV(), option);

    map.addSource("shallow-moonquake-source", genQuakeSourceData(shallowMoonquakes));
    map.addSource("deep-moonquake-source", genQuakeSourceData(deepMoonquakes));
    map.addSource("artical-moonquake-source", genQuakeSourceData(artificialImpacts));
    map.addLayer({
      id: "shallow-moonquake-layer",
      type: "circle",
      source: "shallow-moonquake-source",
      paint: {
        "circle-radius": moonQuakeRad,
        "circle-color": "#FFA50088",
      },
    });
    map.addLayer({
      id: "deep-moonquake-layer",
      type: "circle",
      source: "deep-moonquake-source",
      paint: {
        "circle-radius": moonQuakeRad,
        "circle-color": "#ee82ee88",
      },
    });
    map.addLayer({
      id: "artical-moonquake-layer",
      type: "circle",
      source: "artical-moonquake-source",
      paint: {
        "circle-radius": moonQuakeRad,
        "circle-color": "#0000FF88",
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
      type: "symbol",
      source: "geojson-source",
      layout: {
        "text-field": ["get", "name"],
        "text-variable-anchor": ["top"],
        "text-radial-offset": 0.5,
        "text-justify": "auto",
      },
      paint: {
        "text-color": "#FFFFFF",
      },
    });

    map.on("moveend", () => {
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      setLngLats([sw, ne]);
    });

    map.on("click", "geojson-points", (e) => {
      const feature = e.features?.length && e.features[0];
      if (!feature) return;
      const properties = feature.properties;
      console.log(properties);
      toast({
        title: properties.name,
        description: properties.detail,
        position: "top",
        duration: 4000,
        isClosable: true,
      });
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
