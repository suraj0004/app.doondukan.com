import {
    MY_ADDRESS_FETCH_REQUEST,
    MY_ADDRESS_FETCH_SUCCESS,
    MY_ADDRESS_FETCH_FAILURE,
} from "./myAddressTypes"

const initialState = {
    loading: false,
    error: null,
    data: [],
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MY_ADDRESS_FETCH_REQUEST:
            return {
                loading: true,
                error: null,
                data: [],
            };

        case MY_ADDRESS_FETCH_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
            }
        case MY_ADDRESS_FETCH_FAILURE:
            return {
                loading: false,
                error: action.payload,
                data: [],
            }
        default:
            return state;
    }
}

export default reducer;