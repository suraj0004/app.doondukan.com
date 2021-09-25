import { api } from "Services/api";
import { api_fail_error } from "Helpers/constant.js";
import {
  CATEGORY_FETCH_REQUEST,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_FAILURE,
} from "./categoryTypes";

export const categoryRequest = () => {
  return {
    type: CATEGORY_FETCH_REQUEST,
  };
};

export const categorySuccess = (data) => {
  return {
    type: CATEGORY_FETCH_SUCCESS,
    payload: data,
  };
};

export const categoryFailure = (error) => {
  return {
    type: CATEGORY_FETCH_FAILURE,
    payload: error,
  };
};

export const fetchCategories = (shop_slug) => {
  return (dispatch) => {
    dispatch(categoryRequest());
    api
      .get(shop_slug)
      .then((response) => {
        if (response.data.success) {
          dispatch(categorySuccess(response.data.data));
        } else {
          dispatch(categoryFailure(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(categoryFailure(api_fail_error));
      });
  };
};

export const fetchProductSearchResult = async (
  search,
  loadedOptions,
  { page, shop_slug }
) => {
  const response = await api
    .post(`${shop_slug}/search-products?page=${page}`, { search: search })
    .then((res) => res.data);

  if (response.success) {
    return {
      options: response.data.map((item) => {
        return {
          value: `/${shop_slug}/${item.category_slug}?search=${item.product_name}`,
          label: <p> {item.product_name} </p>,
        };
      }),
      hasMore: response.meta.last_page !== response.meta.current_page,
      additional: {
        page: page + 1,
        shop_slug,
      },
    };
  } else {
    return {
      options: [],
      hasMore: false,
      additional: {
        page: 1,
        shop_slug,
      },
    };
  }
};
