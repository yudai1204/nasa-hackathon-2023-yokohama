import { MoonquakeData, Option, OptionConstants } from "@/type";

export const filterMoonQuake = (moonquakeData: MoonquakeData[], option: Option): MoonquakeData[] => {
  const typeFilteredmoonquakeData = moonquakeData.filter((moonquake) => option.typeFilter.has(moonquake.type));

  if (option.playInfo.status === "stop") {
    if (option.minYear === OptionConstants.minYear && option.maxYear === OptionConstants.maxYear) {
      return typeFilteredmoonquakeData;
    }

    return typeFilteredmoonquakeData.filter((moonquake) => {
      const year = moonquake.time?.year ?? 0;
      return year >= option.minYear && year <= option.maxYear;
    });
  }

  return typeFilteredmoonquakeData.filter((moonquake) => {
    return moonquake.time?.year === option.playInfo.year;
  });
};
