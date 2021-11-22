import { GET_USER_DATA, LOGUT_USER, SET_USER_DATA } from "../action-types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  userData: cookies.get("userInfo") || {},
  token: cookies.get("user") || "",
};

export function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_DATA:
      return state;
    case LOGUT_USER:
      cookies.remove("user");
      cookies.remove("userInfo");
      return initialState;
    case SET_USER_DATA:
      let tommorowDiff = 24 * 60 * 60 * 1000 * 1;
      let date = new Date();
      date.setTime(date.getTime() + tommorowDiff);

      cookies.set("user", payload.userInfo.token, {
        path: "/",
        expires: date,
      });
      cookies.set("userInfo", payload.userInfo, {
        path: "/",
        expires: date,
      });
      return { ...state, userData: payload.userInfo };
    default:
      return state;
  }
}
