import { csvDataFetch } from "./fetchCSV";
import { DeepMoonquake, DeepMoonquakeCSVData, ShallowMoonquake, ShallowMoonquakeCSVData } from "@/type";

export const fetchShallowMoonquakeCSV = (): Promise<ShallowMoonquake[]> => {
  return csvDataFetch(
    "https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/data/nakamura_1979_sm_locations.csv",
  )
    .then((res) => {
      return res.map((data) => {
        const { Year, Day, H, M, S, Lat, Long, Magnitude, Comments } = data as ShallowMoonquakeCSVData;
        const quake: ShallowMoonquake = {
          time: {
            year: Number(Year),
            day: Number(Day),
            hour: Number(H),
            minutes: Number(M),
            seconds: Number(S),
          },
          location: {
            latitude: Number(Lat),
            longitude: Number(Long),
          },
          magnitude: Number(Magnitude),
          comments: Comments,
        };
        return quake;
      });
    })
    .catch((e) => {
      console.error(e);
      return [];
    });
};

export const fetchDeepMoonquakeCSV = (): Promise<DeepMoonquake[]> => {
  return csvDataFetch(
    "https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/data/nakamura_2005_dm_locations.csv ",
  )
    .then((res) => {
      return res.map((data) => {
        const { A, Side, Lat, Lat_Error, Long, Long_Error, Depth, Depth_Error } = data as DeepMoonquakeCSVData;
        const quake: DeepMoonquake = {
          A: A,
          side: Side,
          location: {
            latitude: Number(Lat),
            longitude: Number(Long),
          },
          latitudeError: Number(Lat_Error),
          longitudeError: Number(Long_Error),
          depth: Number(Depth),
          depthError: Number(Depth_Error),
          assumed: "",
        };
        return quake;
      });
    })
    .catch((e) => {
      console.error(e);
      return [];
    });
};
