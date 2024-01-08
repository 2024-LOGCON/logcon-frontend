import { atom } from "recoil";

export const userInfoState = atom({
  key: "userInfo",
  default: {
    loaded: false,
  },
});
