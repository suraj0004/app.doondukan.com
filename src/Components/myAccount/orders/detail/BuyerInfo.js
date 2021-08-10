import React from "react";
import moment from "moment";

const BuyerInfo = ({ buyer, deliveryInfo }) => {
  const getDeliveryInfo = () => {
    if (deliveryInfo.isHomeDelivery) {
      return (
        <tr>
          <th>Delivery Address:</th>
          <td>
            {deliveryInfo.deliveryAddress.name},
            <a href={`tel:${deliveryInfo.deliveryAddress.mobile}`}>
              {" "}
              {deliveryInfo.deliveryAddress.mobile}{" "}
            </a>
            <br />
            {deliveryInfo.deliveryAddress.address},<br />
            {deliveryInfo.deliveryAddress.city},{" "}
            {deliveryInfo.deliveryAddress.pincode},{" "}
            {deliveryInfo.deliveryAddress.state}
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>Pickup Date &amp; Time:</th>
          <td>
            {moment(deliveryInfo.fromTime).format("Do MMMM YYYY")},<br />
            {moment(deliveryInfo.fromTime, "HH:mm:SS").format(
              "hh:mm A"
            )} to {moment(deliveryInfo.toTime, "HH:mm:SS").format("hh:mm A")}
          </td>
        </tr>
      );
    }
  };
  return (
    <div className="pb-5 pt-3">
      <h4 className=""> Your Information </h4>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{buyer.name}</td>
          </tr>
          <tr>
            <th>Mobile:</th>
            <td>
              <a href={`tel:${buyer.phone}`}> {buyer.phone} </a>
            </td>
          </tr>
          <tr>
            <th>Delivery Type: </th>
            <td>{deliveryInfo.deliveryType}</td>
          </tr>
          {getDeliveryInfo()}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerInfo;
