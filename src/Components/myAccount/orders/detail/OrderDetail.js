import React from 'react';
import ShopInfo from "Components/common/ShopInfo";
import OrderTimeline from './OrderTimeline'
import OrderItem from './OrderItem'
import GrandTotal from "Components/cart/GrandTotal"
import BuyerInfo from "./BuyerInfo"
const OrderDetail = ({ data }) => {
    let grand_total = 0
    const deliveryInfo = {
        isHomeDelivery: data.is_home_delivery,
        deliveryType: data.delivery_type,
        fromTime: data.from_time,
        toTime: data.to_time,
        deliveryAddress: data.delivery_address,
    }
    return (
        <div className="col-12 card">
            <div className="row">
                <div className="col-md-6">
                    <ShopInfo shop_info={data.store} />
                </div>
                <div className="col-md-6">
                    <OrderTimeline status={data.status} order_no={data.order_no} />
              </div>
            </div>
            <div className="row">
                <div className="col-md-2">

                </div>
                <div className="col-md-8">
                    <hr/>
                    <h4 className="text-center border-bottom border-left border-right pb-4"> 
                    Order No : #{data.order_no}
                    <br/> 
                    Total Items : {data.items.length}
                    </h4>
                    {
                        data.items.map(item =>{
                            grand_total += (item.quantity * Number(item.price).toFixed(2) )
                            return  <OrderItem item={item} />
                        })
                    }
                    <hr/>
                    <div className="pr-3 text-right">
                    <GrandTotal grand_total={grand_total} />
                    </div>
                    <hr/>
                </div>
            </div>
            <div className="row">
            <div className="col-md-2"></div>
               <div className="col-md-8">
               <BuyerInfo buyer={data.buyer} deliveryInfo={deliveryInfo} />
               </div>
            </div>
        </div>
    );
};

export default OrderDetail;