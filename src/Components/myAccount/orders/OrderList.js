import React from 'react';
import OrderItem from './OrderItem'
const OrderList = ({orders}) => {
    return (
        <div className="row">
                       {
                           orders.map(order => {
                               return <OrderItem order={order} />
                           })
                       }
                   </div>
    );
};

export default OrderList;