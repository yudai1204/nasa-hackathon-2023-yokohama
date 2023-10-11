import { csvDataFetch } from "./fetchCSV";
import {
  ArtificialImpact,
  ArtificialImpactCSVData,
  DeepMoonquake,
  DeepMoonquakeCSVData,
  ShallowMoonquake,
  ShallowMoonquakeCSVData,
} from "@/type";

export const fetchShallowMoonquakeCSV = (): Promise<ShallowMoonquake[]> => {
  return csvDataFetch(
    "https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/data/nakamura_1979_sm_locations.csv",
  )
    .then((res) => {
      return res
        .map((data) => {
          const { Year, Day, H, M, S, Lat, Long, Magnitude, Comments } = data as ShallowMoonquakeCSVData;
          const quake: ShallowMoonquake = {
            type: 0,
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
        })
        .filter((quake) => {
          return !isNaN(quake.location.latitude) && !isNaN(quake.location.longitude);
        });
    })
    .catch((e) => {
      console.error(e);
      return [];
    });
};

export const fetchDeepMoonquakeCSV = (): Promise<DeepMoonquake[]> => {
  return csvDataFetch(
    "https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/data/nakamura_2005_dm_locations.csv",
  )
    .then((res) => {
      return res
        .map((data) => {
          const { A, Side, Lat, Lat_Error, Long, Long_Error, Depth, Depth_Error } = data as DeepMoonquakeCSVData;
          const quake: DeepMoonquake = {
            type: 1,
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
        })
        .filter((quake) => {
          return !isNaN(quake.location.latitude) && !isNaN(quake.location.longitude);
        });
    })
    .catch((e) => {
      console.error(e);
      return [];
    });
};

export const fetchArtificialImpactCSV = (): Promise<ArtificialImpact[]> => {
  return csvDataFetch(
    "https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/data/nakamura_1983_ai_locations.csv",
  )
    .then((res) => {
      return res
        .map((data) => {
          const { AI, Lat, Long, Y, JD, Hour, Min, Sec } = data as ArtificialImpactCSVData;
          const quake: ArtificialImpact = {
            type: 2,
            ai: AI,
            location: {
              latitude: Number(Lat),
              longitude: Number(Long),
            },
            time: {
              year: Number(Y) + 1900,
              day: Number(JD),
              hour: Number(Hour),
              minutes: Number(Min),
              seconds: Number(Sec),
            },
          };
          return quake;
        })
        .filter((quake) => {
          return !isNaN(quake.location.latitude) && !isNaN(quake.location.longitude);
        });
    })
    .catch((e) => {
      console.error(e);
      return [];
    });
};
