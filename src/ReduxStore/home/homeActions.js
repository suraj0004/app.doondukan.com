import { 
    SHOP_LIST_REQUEST,
    SHOP_LIST_SUCCESS,
    SHOP_LIST_FAILUER,
} from './homeTypes'

import { api } from 'Services/api';
import { api_fail_error } from "Helpers/constant.js"


export const shopListRequest = () => {
    return {
        type: SHOP_LIST_REQUEST
    }
}

export const shopListSuccess = (payload) => {
    return {
        type: SHOP_LIST_SUCCESS,
        payload
    }
}

export const shopListFailuer = (payload) => {
    return {
        type: SHOP_LIST_FAILUER,
        payload
    }
}

export const fetchShopList = () => {
    return (dispatch) => {
        dispatch(shopListRequest())
        api.get('get-near-by-shop')
        .then((response) =>{
            console.log(response);
            if(response.data.success){
                dispatch(shopListSuccess(response.data.data))
            }else{
                dispatch(shopListFailuer(response.data.message))
            }
        }).catch((err) =>{
            console.log(err);
            dispatch(shopListFailuer(api_fail_error))
        })
    }
}