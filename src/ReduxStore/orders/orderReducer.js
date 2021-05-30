import {
    ORDER_FETCH_REQUEST,
    ORDER_FETCH_SUCCESS,
    ORDER_FETCH_FAILURE,
} from "./orderTypes"

const initialState = {
    loading: false,
    error: null,
    data: [],
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_FETCH_REQUEST:
            return {
                loading: true,
                error: null,
                data: [],
            };

        case ORDER_FETCH_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
            }
        case ORDER_FETCH_FAILURE:
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