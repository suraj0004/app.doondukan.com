import {api} from 'Services/api';
import { api_fail_error }  from "Helpers/constant.js"

import {
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_FAILURE
} from "./productTypes";

import { showLoader, stopLoader } from "ReduxStore/global/actions"

export const productRequest = () => {
    return {
        type: PRODUCT_FETCH_REQUEST
    }
}

export const productSuccess = (data) => {
    return {
        type: PRODUCT_FETCH_SUCCESS,
        payload: data
    }
}

export const productFailure = (error) => {
    return {
        type: PRODUCT_FETCH_FAILURE,
        payload: error
    }
}

export const fetchProducts = ( shop_slug, category_slug, search) => {
    return (dispatch) => {
        // fetching data
        dispatch(showLoader())
        api.post(`${shop_slug}/${category_slug}`,{
            search
        })
        .then(response => {
            if(response.data.success) {
                dispatch(productSuccess(response.data.data))
            }else{
                dispatch(productFailure(response.data.message))    
            }
            dispatch(stopLoader())
        }).catch(error => {
            dispatch(productFailure(api_fail_error))
            dispatch(stopLoader())
        })
    }
}