import { authApi } from 'Services/api';
import { api_fail_error } from "Helpers/constant.js"
import {
    ORDER_FETCH_REQUEST,
    ORDER_FETCH_SUCCESS,
    ORDER_FETCH_FAILURE
} from "./orderTypes";

export const orderRequest = () => {
    return {
        type: ORDER_FETCH_REQUEST
    }
}

export const orderSuccess = (data) => {
    return {
        type: ORDER_FETCH_SUCCESS,
        payload: data
    }
}

export const orderFailure = (error) => {
    return {
        type: ORDER_FETCH_FAILURE,
        payload: error
    }
}

export const fetchOrders = () => {
    return (dispatch) => {

        dispatch(orderRequest())
        authApi.get('order/list')
            .then(response => {
                if (response.data.success) {
                    dispatch(orderSuccess(response.data.data))
                } else {
                    dispatch(orderFailure(response.data.message))
                }
            }).catch(error => {
                dispatch(orderFailure(api_fail_error))
            })
    }
}