import { atom } from "recoil";

export const textState = atom({
  key: "textState",
  default: "Komail",
});
export const textState2 = atom({
  key: "textState2",
  default: "devs",
});
export const DefaultUrl = atom({
  key: "DefaultUrl",
  default: "http://172.16.1.114:3000",
});
export const AccessToken = atom({
  key: "AccessToken",
  default: "",
});
export const User = atom({
  key: "User",
  default: {},
});

export const cartData = atom({
  key: "cartData",
  default: [],
});

export const productData = atom({
  key: "productData",
  default: [],
});

export const winnerData = atom({
  key: "winnerData",
  default: [],
});
export const OffersData = atom({
  key: "OffersData",
  default: [],
});
export const correctAnswer = atom({
  key: "correctAnswer",
  default: [],
});
