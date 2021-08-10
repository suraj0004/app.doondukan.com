import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const GrandTotal = ({
  grand_total,
  deliveryCharges = null,
  deliveryMedium = null,
  isHomeDelivery = false,
}) => {
  if (
    deliveryCharges &&
    ((deliveryMedium && deliveryMedium !== "user-self-collected") ||
      isHomeDelivery === true)
  ) {
    deliveryCharges = Number(deliveryCharges);
    return (
      <div>
        <div className="row p-2 font-weight-bold text-dark">
          <div className="col-9 p-0 m-0">
            Total Order Amount <small className="text-secondary"></small>
          </div>
          <div className="col-3 text-right p-0 m-0">
            <FaRupeeSign size="15" />
            {grand_total}
          </div>
        </div>
        <div className="row p-2 font-weight-bold text-dark">
          <div className="col-9 p-0 m-0">
            Delivery Charges <small className="text-secondary"></small>
          </div>
          <div className="col-3 text-right p-0 m-0">
            <FaRupeeSign size="15" />
            {deliveryCharges}
          </div>
        </div>
        <hr />
        <div className="row p-2 font-weight-bold text-dark">
          <div className="col-9 p-0 m-0">
            Grand Total{" "}
            <small className="text-secondary">(Inclusive of all taxes)</small>
          </div>
          <div className="col-3 text-right p-0 m-0">
            <FaRupeeSign size="15" />
            {grand_total + deliveryCharges}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="row p-2 font-weight-bold text-dark">
      <div className="col-9 p-0 m-0">
        Grand Total{" "}
        <small className="text-secondary">(Inclusive of all taxes)</small>
      </div>
      <div className="col-3 text-right p-0 m-0">
        <FaRupeeSign size="15" />
        {grand_total}
      </div>
    </div>
  );
};

export default GrandTotal;
