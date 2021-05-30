import ShopTiming from "Components/cart/ShopTiming"

const ShopInfo = ({shop_info}) => {
    return (
        <>
            <div className="img-responsive text-center mt-5">
                <img src={shop_info.logo} height="150" width="150" className="img-fluid rounded-circle" alt={shop_info.shop_name} />
            </div>

            <div className="text-center">
                <h5>{shop_info.shop_name}</h5>
                <p>{shop_info.address}</p>
                <p> <a href={`tel:${shop_info.mobile}`}>+91-{shop_info.mobile}  </a> ({shop_info.seller_name}) </p>
                <ShopTiming 
                    from_time={shop_info.open_at} 
                    to_time={shop_info.close_at} 
                />
            </div>
        </>
    );
};

export default ShopInfo;