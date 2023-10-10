import { MoonquakeData } from "@/type/moon";
import { Option, OptionConstants } from "@/type/option";

export const moonQuakeFilter = (moonquakeData: MoonquakeData[], option: Option): MoonquakeData[] => {
  const isAll = option.minYear === OptionConstants.minYear && option.maxYear === OptionConstants.maxYear;

  const filteredMoonquakeData = moonquakeData
    .filter((moonquake) => {
      if (isAll) return true;
      const year = moonquake.time?.year ?? 0;
      return year >= option.minYear && year <= option.maxYear;
    })
    .filter((moonquake) => option.typeFilter.has(moonquake.type));
  return filteredMoonquakeData;
};
