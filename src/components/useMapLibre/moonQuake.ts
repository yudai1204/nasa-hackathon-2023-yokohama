import type { GeoJSONSourceSpecification } from "@maplibre/maplibre-gl-style-spec/dist/index.d";
import type { MoonquakeData } from "@/type/moon";

export const genQuakeSourceData = (moonquakeData: MoonquakeData[]): GeoJSONSourceSpecification => {
  const features = moonquakeData.map((data) => ({
    type: "Feature",
    properties: {
      id: null,
      name: "Moonquake",
      detail: "One of the moonquake",
    },
    geometry: { type: "Point", coordinates: [data.location.longitude, data.location.latitude] },
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
