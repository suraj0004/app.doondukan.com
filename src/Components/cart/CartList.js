import React from 'react';
import CartItem from './CartItem';

function CartList({cart}) {

    return (
        <>
            {
                cart.map((item,index) =>{
                    return <>
                    <CartItem item={item} key={item.id} />
                    {index === (cart.length - 1) ?null:<hr/>}
                    </>
                })
            }
        </>
    );
}

export default CartList;