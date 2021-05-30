import {
    CART_FETCH_REQUEST,
    CART_FETCH_SUCCESS,
    CART_FETCH_FAILURE,
    UPDATE_CART,
    UPDATE_ITEM_QUANTITY,
    DELETE_PRODUCT,
    SHOP_INFO_FETCH_REQUEST,
    SHOP_INFO_FETCH_SUCCESS,
    SHOP_INFO_FETCH_FAILURE,
} from './cartTypes';

const initialState = {
    loading: false,
    error: null,
    data: [],
    shop_info: {
        loading: false,
        error: null,
        data: null,
    },
};

const reducer = (state = initialState, action) => {
    let data;
    switch (action.type) {
        case CART_FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                data: []
            };

        case CART_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }
        case CART_FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: [],
            }
        case UPDATE_CART:
             data = state.data;
            data.push(action.payload);
            return {
                ...state,
                data: data,
            }
        case UPDATE_ITEM_QUANTITY:
             data = state.data;
            data = data.map((item) => {
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            });

            return {
                ...state,
                data: data,
                loading: false,
            }

        case DELETE_PRODUCT:
             data = state.data;
            data = data.filter((item) => (item.id !== action.payload));

            return {
                ...state,
                data: data,
                loading: false,
            }

        case SHOP_INFO_FETCH_REQUEST:
            return {
                ...state,
                shop_info: {
                    ...state.shop_info,
                    loading: true,
                }
            };

        case SHOP_INFO_FETCH_SUCCESS:
            return {
                ...state,
                shop_info: {
                    ...state.shop_info,
                    loading: false,
                    error: null,
                    data: action.payload,
                }

            }
        case SHOP_INFO_FETCH_FAILURE:
            return {
                ...state,
                shop_info: {
                    ...state.shop_info,
                    loading: false,
                    error: action.payload,
                    data: [],
                }
            }

        default:
            return state;
    }
}

export default reducer;