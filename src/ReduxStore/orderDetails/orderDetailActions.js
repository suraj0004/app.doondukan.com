import { authApi } from 'Services/api';
import { api_fail_error } from "Helpers/constant.js"
import {
    ORDER_DETAIL_FETCH_REQUEST,
    ORDER_DETAIL_FETCH_SUCCESS,
    ORDER_DETAIL_FETCH_FAILURE
} from "./orderDetailTypes";

import { showLoader, stopLoader } from "ReduxStore/global/actions";
import { errorNotification } from "Services/notification";


export const orderDetailRequest = () => {
    return {
        type: ORDER_DETAIL_FETCH_REQUEST
    }
}

export const orderDetailSuccess = (data) => {
    return {
        type: ORDER_DETAIL_FETCH_SUCCESS,
        payload: data
    }
}

export const orderDetailFailure = (error) => {
    return {
        type: ORDER_DETAIL_FETCH_FAILURE,
        payload: error
    }
}

export const fetchOrderDetail = (order_no) => {
    return (dispatch) => {

        dispatch(orderDetailRequest())
        authApi.get(`order/detail/${order_no}`)
            .then(response => {
                if (response.data.success) {
                    dispatch(orderDetailSuccess(response.data.data))
                } else {
                    dispatch(orderDetailFailure(response.data.message))
                }
            }).catch(error => {
                dispatch(orderDetailFailure(api_fail_error))
            })
    }
}

export const cancelOrder = (order_no) => {
    return (dispatch) => {

        dispatch(orderDetailRequest())
        authApi.post(`order/cancel`,{
            order_no
        })
        .then(response => {
                if (response.data.success) {
                    dispatch(fetchOrderDetail(order_no))
                } else {
                    dispatch(orderDetailFailure(response.data.message))
                }
            }).catch(error => {
                dispatch(orderDetailFailure(api_fail_error))
            })
    }
}

export const downloadInvoice = (order_no) => {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        dispatch(showLoader());
        authApi.post(`order/invoice`,{
            order_no
        },
        {
            responseType: 'blob'
        })
          .then((response) => {
              resolve(response);
          })
          .catch((error) => {
            errorNotification(api_fail_error);
            reject(error);
          }).finally(() => {
            dispatch(stopLoader());
          });
      });
    };
  };