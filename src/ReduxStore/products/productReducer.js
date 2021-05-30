import {
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_FAILURE
} from './productTypes';

const initialState = {
    loading: false,
    error: null,
    data: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_FETCH_REQUEST:
            return {
                loading: true,
                error: null,
                data: [],
            };

        case PRODUCT_FETCH_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
            }
        case PRODUCT_FETCH_FAILURE:
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