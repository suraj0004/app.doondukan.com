import Axios from "axios";
import { getCookie } from "Services/cookie";
import { login_cookie_key, user_cookie_key } from "Helpers/constant";
import store from "ReduxStore/store";
import { unsetAuthUser } from "ReduxStore/index";
import { removeCookie } from "Services/cookie";

export const api = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_PATH,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const customAuthApi = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_PATH,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie(login_cookie_key),
  },
});

customAuthApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // if user is authorize
    if (error?.response?.status && error.response.status === 401) {
      store.dispatch(unsetAuthUser());
      removeCookie(login_cookie_key);
      removeCookie(user_cookie_key);
    }
    throw error;
  }
);

export const authApi = customAuthApi;
