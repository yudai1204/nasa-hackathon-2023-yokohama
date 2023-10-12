import { MoonquakeData, Option, OptionConstants } from "@/type";

export const filterMoonQuake = (moonquakeData: MoonquakeData[], option: Option): MoonquakeData[] => {
  if (option.playInfo.status === "stop") {
    const isAll = option.minYear === OptionConstants.minYear && option.maxYear === OptionConstants.maxYear;
    return moonquakeData
      .filter((moonquake) => {
        if (isAll) return true;
        const year = moonquake.time?.year ?? 0;
        return year >= option.minYear && year <= option.maxYear;
      })
      .filter((moonquake) => option.typeFilter.has(moonquake.type));
  }
  return moonquakeData
    .filter((moonquake) => {
      return moonquake.time?.year === option.playInfo.year;
    })
    .filter((moonquake) => option.typeFilter.has(moonquake.type));
};
