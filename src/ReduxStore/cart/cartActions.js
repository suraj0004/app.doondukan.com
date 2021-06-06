import {
  CART_FETCH_REQUEST,
  CART_FETCH_SUCCESS,
  CART_FETCH_FAILURE,
  UPDATE_CART,
  UPDATE_ITEM_QUANTITY,
  DELETE_PRODUCT,
  SHOP_INFO_FETCH_REQUEST,
  SHOP_INFO_FETCH_SUCCESS,
  SHOP_INFO_FETCH_FAILURE,
} from "./cartTypes";

import { showLoader, stopLoader } from "ReduxStore/global/actions";

import {
  cart_read,
  cart_insert,
  cart_update,
  cart_delete,
  cart_truncate,
} from "IndexDB/cartDB";
import { authApi, api } from "Services/api";
import { api_fail_error } from "Helpers/constant.js";

export const cartRequest = () => {
  return {
    type: CART_FETCH_REQUEST,
  };
};

export const cartSuccess = (data) => {
  return {
    type: CART_FETCH_SUCCESS,
    payload: data,
  };
};

export const cartFailure = (error) => {
  return {
    type: CART_FETCH_FAILURE,
    payload: error,
  };
};

export const updateCart = (item) => {
  return {
    type: UPDATE_CART,
    payload: item,
  };
};

export const updateQuantity = (item) => {
  return {
    type: UPDATE_ITEM_QUANTITY,
    payload: item,
  };
};

export const deleteQuantity = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};

export const fetchcart = () => {
  return (dispatch, getState) => {
    dispatch(showLoader());

    if (getState().global.isAuthenticated) {
      authApi
        .get(`/${getState().global.shop_slug}/cart/get`)
        .then((response) => {
          dispatch(cartSuccess(response.data.data));
          dispatch(fetchShopInfo());
        })
        .catch((error) => {
          dispatch(cartFailure(api_fail_error));
        })
        .finally(() => {
          dispatch(stopLoader());
        });
    } else {
      cart_read()
        .then((data) => {
          dispatch(cartSuccess(data));
          dispatch(fetchShopInfo());
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(stopLoader());
        });
    }
  };
};

export const addToCart = (item) => {
  return (dispatch, getState) => {
    dispatch(showLoader());

    if (getState().global.isAuthenticated) {
      item = {
        product_id: item.id,
      };
      authApi
        .post(`/${getState().global.shop_slug}/cart/add`, item)
        .then((response) => {
          if (response.data.success) {
            dispatch(updateCart(response.data.data));
          }
        })
        .catch((error) => {
          dispatch(cartFailure(api_fail_error));
        })
        .finally(() => {
          dispatch(stopLoader());
        });
    } else {
      item = {
        product_id: item.id,
        quantity: 1,
        product: item,
      };
      cart_insert(item)
        .then((id) => {
          item.id = id;
          dispatch(updateCart(item));
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(stopLoader());
        });
    }
  };
};

export const updateCartProduct = (item) => {
  return (dispatch, getState) => {
    dispatch(showLoader());

    if (getState().global.isAuthenticated) {
      let payload = {
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
      };
      authApi
        .patch(`/${getState().global.shop_slug}/cart/update`, payload)
        .then((response) => {
          dispatch(updateQuantity(response.data.data));
        })
        .catch((error) => {
          dispatch(cartFailure(api_fail_error));
        })
        .finally(() => {
          dispatch(stopLoader());
        });
    } else {
      cart_update(item.id, item.quantity)
        .then((id) => {
          setTimeout(() => {
            dispatch(updateQuantity(item));
          }, 100);
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(stopLoader());
        });
    }
  };
};

export const deleteCartProduct = (item) => {
  return (dispatch, getState) => {
    dispatch(showLoader());

    if (getState().global.isAuthenticated) {
      authApi
        .delete(`/${getState().global.shop_slug}/cart/delete/${item.id}`)
        .then((response) => {
          dispatch(deleteQuantity(item.id));
        })
        .catch((error) => {
          dispatch(cartFailure(api_fail_error));
        })
        .finally(() => {
          dispatch(stopLoader());
        });
    } else {
      cart_delete(item.id)
        .then(() => {
          dispatch(deleteQuantity(item.id));
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(stopLoader());
        });
    }
  };
};

export const truncateCart = () => {};

export const syncCart = () => {
  return (dispatch, getState) => {
    cart_read()
      .then((cart) => {
        cart = cart.map((item) => {
          return {
            product_id: item.product_id,
            quantity: item.quantity,
          };
        });

        authApi
          .post(`/${getState().global.shop_slug}/cart/sync`, { cart })
          .then((response) => {
            cart_truncate()
              .then((ids) => {
                dispatch(fetchcart());
              })
              .catch((error) => {});
          })
          .catch((error) => {});
      })
      .catch((err) => {});
  };
};

export const shopInfoRequest = () => {
  return {
    type: SHOP_INFO_FETCH_REQUEST,
  };
};

export const shopInfoSuccess = (data) => {
  return {
    type: SHOP_INFO_FETCH_SUCCESS,
    payload: data,
  };
};

export const shopInfoFailure = (error) => {
  return {
    type: SHOP_INFO_FETCH_FAILURE,
    payload: error,
  };
};

export const fetchShopInfo = () => {
  return (dispatch, getState) => {
    dispatch(shopInfoRequest());
    api
      .get(`/${getState().global.shop_slug}/shop/info`)
      .then((response) => {
        if (response.data.success) {
          dispatch(shopInfoSuccess(response.data.data));
        } else {
          dispatch(shopInfoFailure(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(shopInfoFailure(api_fail_error));
      });
  };
};
