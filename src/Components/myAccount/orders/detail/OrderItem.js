import React from 'react';
import {FaRupeeSign} from "react-icons/fa"

const OrderItem = ({item}) => {

    let price = Number(item.price).toFixed(2)
    return (
        <div className="row order-detail-product p-2 ">
        <div className="col-md-3 text-center">
            <img src={item.product.thumbnail}
            height="90"
            width="90"
            alt={item.product.name}
            />
        </div>
        <div className="col-md-6">
            <p className="m-0 p-0">
                {item.product.name}
            </p>
            <p className="m-0 p-0">
                <small> {item.product.weight}</small>
            </p>
            <p className="m-0 p-0">
            <span className="badge badge-primary p-2 mt-3"> {item.quantity} </span> X <FaRupeeSign/>{price}
            </p>
        </div>
        <div className="col-md-3 order-detail-product-total-price">
        <div style={{ 
            position: "absolute",
            bottom: 10,
            right: 20
        }}>
        <FaRupeeSign/>{price * item.quantity}
        </div>
        </div>
    
    </div>
    );
};

export default OrderItem;