const CITY_KEY = "last_city";
const UNIT_KEY = "preferred_unit";

export const saveCity = (city) => {
  localStorage.setItem(CITY_KEY, city);
};

export const getSavedCity = () => {
  return localStorage.getItem(CITY_KEY);
};

export const saveUnit = (unit) => {
  localStorage.setItem(UNIT_KEY, unit);
};

export const getSavedUnit = () => {
  return localStorage.getItem(UNIT_KEY) || "metric";
};
