import { authApi } from 'Services/api';
import { api_fail_error } from "Helpers/constant.js"
import {
    MY_ADDRESS_FETCH_REQUEST,
    MY_ADDRESS_FETCH_SUCCESS,
    MY_ADDRESS_FETCH_FAILURE
} from "./myAddressTypes";

import { errorNotification, successNotification } from "Services/notification";
import { showLoader, stopLoader } from "ReduxStore/global/actions";

export const myAddressRequest = () => {
    return {
        type: MY_ADDRESS_FETCH_REQUEST
    }
}

export const myAddressSuccess = (data) => {
    return {
        type: MY_ADDRESS_FETCH_SUCCESS,
        payload: data
    }
}

export const myAddressFailure = (error) => {
    return {
        type: MY_ADDRESS_FETCH_FAILURE,
        payload: error
    }
}

export const fetchAddresses = () => {
    return (dispatch) => {

        dispatch(myAddressRequest())
        authApi.get('address/list')
            .then(response => {
                if (response.data.success) {
                    dispatch(myAddressSuccess(response.data.data))
                } else {
                    dispatch(myAddressFailure(response.data.message))
                }
            }).catch(error => {
                dispatch(myAddressFailure(api_fail_error))
            })
    }
}

export const addAddress = (payload) => {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        dispatch(showLoader());
        authApi
          .post("address/add", payload)
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
          }).finally(() => {
            dispatch(stopLoader());
          });
      });
    };
  };