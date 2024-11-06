import { useState } from "react";

export const useLocalStorage = (key, defaultVal) => {
  const [storedVal, setStoredVal] = useState(() => {
    const val = window.localStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    } else {
      window.localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
  });
  const setValue = (newVal) => {
    setStoredVal((currValue) => {
      let valToStore = newVal;
      if (typeof newVal === "function") {
        valToStore = newVal(currValue);
      } else if (Array.isArray(newVal)) {
        valToStore = [...newVal];
      } else if (typeof newVal === "object") {
        valToStore = { ...newVal };
      }
      window.localStorage.setItem(key, JSON.stringify(valToStore));
      return valToStore;
    });
  };
  return [storedVal, setValue];
};
