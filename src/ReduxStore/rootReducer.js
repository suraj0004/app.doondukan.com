import { combineReducers } from 'redux';
import categoryReducer from 'ReduxStore/categories/categoryReducer';
import productReducer from 'ReduxStore/products/productReducer';
import cartReducer from 'ReduxStore/cart/cartReducer';
import globalReducer from 'ReduxStore/global/reducer';
import orderReducer from 'ReduxStore/orders/orderReducer';
import orderDetailReducer from 'ReduxStore/orderDetails/orderDetailReducer';

const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    global: globalReducer,
    orders: orderReducer,
    orderDetail : orderDetailReducer,

});

export default rootReducer;