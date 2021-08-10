import React from "react";
import Moment from "react-moment";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  var status = null;
  if (order.status === 0) {
    status = <span className="badge badge-warning p-2">Pending</span>;
  } else if (order.status === 1) {
    status = <span className="badge badge-primary p-2">Confirmed</span>;
  } else if (order.status === 2) {
    status = <span className="badge badge-success p-2">Completed</span>;
  } else {
    status = <span className="badge badge-danger p-2">Canceled</span>;
  }
  return (
    <div className="col-md-6 pb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {" "}
            <img
              src={order.store.logo}
              height="100"
              width="100"
              className="img-fluid rounded-circle mr-3"
              alt={order.store.shop_name}
            />{" "}
            {order.store.shop_name}{" "}
          </h5>
          <div className="pb-3">
            <Link to={`/orders/${order.order_no}`} className="card-link">
              <span className="link">
                <strong>Order</strong> #{order.order_no}
              </span>
            </Link>
            <span className="float-right">
              <Moment format="DD-MMMM-YYYY h:mm A">{order.created_at}</Moment>
            </span>
          </div>
          <div className="pb-3">
            <span className="card-subtitle text-muted">
              {" "}
              {order.orderitem_count} items{" "}
            </span>

            <strong className="float-right">
              {" "}
              <FaRupeeSign /> {Number(order.order_amount).toFixed(2)}{" "}
            </strong>
          </div>
          <hr />
          <h6 className="card-subtitle">
            {status}
            <Link
              to={`/orders/${order.order_no}`}
              className="btn btn-info btn-sm float-right"
            >
              View Details
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
