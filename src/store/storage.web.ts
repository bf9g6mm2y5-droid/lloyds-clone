import { StateStorage } from "zustand/middleware";

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    localStorage.setItem(name, value);
    return Promise.resolve();
  },
  getItem: (name) => {
    return Promise.resolve(localStorage.getItem(name));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    return Promise.resolve();
  },
};

export default zustandStorage;
