import { 
    SHOP_LIST_REQUEST,
    SHOP_LIST_SUCCESS,
    SHOP_LIST_FAILUER,
} from './homeTypes'

const initialState = {
    loading: true,
    data : [],
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case SHOP_LIST_REQUEST:{
            return {
                loading: true,
                data: [],
                error: null,
            }
        }
        case SHOP_LIST_SUCCESS:{
            return{
                loading: false,
                data: action.payload,
                error: null,
            }
        }
        case SHOP_LIST_FAILUER:{
            return{
                loading: false,
                data: [],
                error: action.payload
            }
        }
         default:{
             return state
         }
    }
}

export default reducer;