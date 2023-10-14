import type { GeoJSONSourceSpecification } from "@maplibre/maplibre-gl-style-spec/dist/index.d";
import type { MoonquakeData } from "@/type/moon";

export const genQuakeSourceData = (moonquakeData: MoonquakeData[]): GeoJSONSourceSpecification => {
  const features = moonquakeData.map((data) => ({
    type: "Feature",
    properties: { prop: JSON.stringify(data) },
    geometry: { type: "Point", coordinates: [data.location.longitude + 90, data.location.latitude * 1.2] },
  }));

  const ret: GeoJSONSourceSpecification = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      name: "moonquake",
      features: features,
    },
  };
  return ret;
};
