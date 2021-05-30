import {
    CATEGORY_FETCH_REQUEST,
    CATEGORY_FETCH_SUCCESS,
    CATEGORY_FETCH_FAILURE
} from './categoryTypes';

const initialState = {
    loading: false,
    error: null,
    data: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_FETCH_REQUEST:
            return {
                loading: true,
                error: null,
                data: [],
            };

        case CATEGORY_FETCH_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
            }
        case CATEGORY_FETCH_FAILURE:
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