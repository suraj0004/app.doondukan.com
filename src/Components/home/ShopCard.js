import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ShopTiming from "Components/cart/ShopTiming";

const ShopCard = ({ shop }) => {
  return (
    <div className="card mt-4 p-1 __box-shadow">
      <div className="card-header">
        <h5 className=" text-center">{shop.name}</h5>
      </div>
      <div className="card-body row">
        <div className="col-md-3 col-4 img-responsive">
          <img src={shop.logo} alt={shop.name} className="img-fluid" />
        </div>
        <div className="col-md-9 col-8">
          <p>
            <strong>Owner: </strong> {shop.user.name}
          </p>
          <p>
            <strong>Mobile: </strong>{" "}
            <a href={`tel:${shop.user.phone}`}>{shop.user.phone}</a>,{" "}
            <a href={`tel:${shop.mobile}`}>{shop.mobile}</a>{" "}
          </p>
          <p>
            <strong>Address: </strong> {shop.address}
          </p>
          <p>
            <ShopTiming
              from_time={shop.open_at}
              to_time={shop.close_at}
              label={<strong>Timing: </strong>}
            />{" "}
          </p>
          <p>
            <strong>About Shop: </strong> {shop.about}
          </p>
        </div>
      </div>

      <div className="card-footer text-right">
        <Link
          to={`/${shop.user_id}-${shop.slug}`}
          className="btn btn-primary btn-sm"
        >
          Go To Shop <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ShopCard;
