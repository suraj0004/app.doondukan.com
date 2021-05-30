import {
    ORDER_DETAIL_FETCH_REQUEST,
    ORDER_DETAIL_FETCH_SUCCESS,
    ORDER_DETAIL_FETCH_FAILURE,
} from "./orderDetailTypes"

const initialState = {
    loading: false,
    error: null,
    data: null,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_DETAIL_FETCH_REQUEST:
            return {
                loading: true,
                error: null,
                data: null,
            };

        case ORDER_DETAIL_FETCH_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
            }
        case ORDER_DETAIL_FETCH_FAILURE:
            return {
                loading: false,
                error: action.payload,
                data: null,
            }
        default:
            return state;
    }
}

export default reducer;