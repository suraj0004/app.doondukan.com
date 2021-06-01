import React from 'react';
import UpdateProductQty from 'Components/cart/UpdateProductQty'
import {FaRupeeSign} from "react-icons/fa"

function CartItem({ item }) {

  return (
    <div className="row m-2">
      <div className="col-md-3 text-center img-responsive">
        <img
          src={item.product.image}
          className="img-fluid"
          height="120"
          width="120"
          alt={item.product.name}
        />
      </div>
      <div className="col-md-8 pt-2">
        <h5>{item.product.name}</h5>
        <UpdateProductQty className="float-right" item={item} />
        <p className="card-text">
         <span className="h6"> <FaRupeeSign size="15"/> {item.product.price}</span> / {item.product.weight}
        </p>
      </div>
    </div>
  );
}

export default CartItem