import {
  SHOW_LOADER,
  STOP_LOADER,
  SET_AUTH_USER,
  SET_SHOP_SLUG,
  UNSET_AUTH_USER,
  SET_USER_DATA,
} from "./types";

import { errorNotification, successNotification } from "Services/notification";
import { api, authApi } from "Services/api";
import { setCookie, removeCookie } from "Services/cookie";
import {
  login_cookie_key,
  shop_slug_cookie,
  api_fail_error,
  user_cookie_key,
} from "Helpers/constant";

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const stopLoader = () => {
  return {
    type: STOP_LOADER,
  };
};

export const setAuthUser = (payload) => {
  return {
    type: SET_AUTH_USER,
    payload: payload,
  };
};

export const setUserData = (payload) => {
  return {
    type: SET_USER_DATA,
    payload: payload,
  };
};

export const setShopSlug = (payload) => {
  setCookie(shop_slug_cookie, payload, { path: "/" });
  return {
    type: SET_SHOP_SLUG,
    payload: payload,
  };
};

export const unsetAuthUser = () => {
  return {
    type: UNSET_AUTH_USER,
  };
};

export const doLogin = (payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(showLoader());
      api
        .post("login", payload)
        .then((response) => {
          if (response.data.success) {
            setTokenCookies(
              payload.remember,
              response.data.data.token,
              response.data.data.user
            );
            dispatch(setAuthUser(response.data.data));
            successNotification(response.data.message);
            resolve();
          } else {
            errorNotification(response.data.message);
            reject();
          }
        })
        .catch((error) => {
          errorNotification(api_fail_error);
          reject();
        });
    });
  };
};

export const doRegister = (payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(showLoader());
      api
        .post("register", payload)
        .then((response) => {
          if (response.data.success) {
            setTokenCookies(
              payload.remember,
              response.data.data.token,
              response.data.data.user
            );
            dispatch(setAuthUser(response.data.data));
            successNotification(response.data.message);
            resolve();
          } else {
            errorNotification(response.data.message);
            reject();
          }
        })
        .catch((error) => {
          errorNotification(api_fail_error);
          reject();
        });
    });
  };
};

export const sendMobileVerificationOTP = (payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(showLoader());
      api
        .post("send-otp", payload)
        .then((response) => {
          if (response.data.success) {
            resolve();
          } else {
            errorNotification(response.data.message);
            reject();
          }
        })
        .catch((error) => {
          errorNotification(api_fail_error);
          reject();
        });
    });
  };
};

export const setTokenCookies = (remember, token, user) => {
  let options = { path: "/" };
  if (remember) {
    let date = new Date();
    const expiryAfterDays = 7;
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * expiryAfterDays);
    options = { path: "/", expires: date };
  }
  setCookie(login_cookie_key, token, options);
  setCookie(user_cookie_key, user, options);
  authApi.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeTokenCookies = () => {
  removeCookie(login_cookie_key);
  removeCookie(user_cookie_key);
  authApi.defaults.headers.Authorization = null;
};

export const doLogOut = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(showLoader());
      authApi
        .post("logout")
        .then((response) => {
          if (response.data.success) {
            removeTokenCookies();
            dispatch(unsetAuthUser());
            resolve(response);
          } else {
            errorNotification(response.data.message);
            reject(response);
          }
        })
        .catch((error) => {
          errorNotification(api_fail_error);
          reject(error);
        })
        .finally(() => {
          dispatch(stopLoader());
        });
    });
  };
};

export const updateProfile = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(showLoader());
      authApi
        .post("profile/update", payload)
        .then((response) => {
          if (response.data.success) {
            dispatch(setUserData(response.data.data));
            setTokenCookies(true, getState().global.token, response.data.data);
            successNotification(response.data.message);
            resolve();
          } else {
            errorNotification(response.data.message);
            reject();
          }
        })
        .catch((error) => {
          errorNotification(api_fail_error);
          reject();
        })
        .finally(() => {
          dispatch(stopLoader());
        });
    });
  };
};

export const sendForgotPasswordOtp = (payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(showLoader());
      api
        .post("send-otp", payload)
        .then((response) => {
          if (response.data.success) {
            resolve();
          } else {
            errorNotification(response.data.message);
            reject();
          }
        })
        .catch((error) => {
          errorNotification(api_fail_error);
          reject();
        });
    });
  };
};

export const doResetPassword = (payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(showLoader());
      api
        .post("forgot-password", payload)
        .then((response) => {
          if (response.data.success) {
            successNotification(response.data.message);
            resolve();
          } else {
            errorNotification(response.data.message);
            reject();
          }
        })
        .catch((error) => {
          errorNotification(api_fail_error);
          reject();
        });
    });
  };
};
