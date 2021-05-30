import {api} from 'Services/api';
import { api_fail_error }  from "Helpers/constant.js"
import {
    CATEGORY_FETCH_REQUEST,
    CATEGORY_FETCH_SUCCESS,
    CATEGORY_FETCH_FAILURE
} from "./categoryTypes";

export const categoryRequest = () => {
    return {
        type: CATEGORY_FETCH_REQUEST
    }
}

export const categorySuccess = (data) => {
    return {
        type: CATEGORY_FETCH_SUCCESS,
        payload: data
    }
}

export const categoryFailure = (error) => {
    return {
        type: CATEGORY_FETCH_FAILURE,
        payload: error
    }
}

export const fetchCategories = (shop_slug) => {
    return (dispatch) => {

        dispatch(categoryRequest())
        api.get(shop_slug)
        .then(response => {
            if(response.data.success) {
                dispatch(categorySuccess(response.data.data))
            }else {
                dispatch(categoryFailure(response.data.message))    
            }
        }).catch(error => {
            dispatch(categoryFailure(api_fail_error))
        })
    }
}