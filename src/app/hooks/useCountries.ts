import countries from "world-countries";

const formattedCountries = countries
  .map((country) => ({
    value: country.cca2,
    name: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  }))
  .sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

export const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((country) => country.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};
