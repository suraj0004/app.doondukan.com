import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const AddressItem = ({ address }) => {
  return (
    <div className="col-md-6 pb-3">
      <div className="card shadow">
        <div className="card-body">
          <div className="pb-3">
            <table className="address_table">
                <tbody>
                <tr>
                <th>Name:</th>
                <td>{address.name}</td>
              </tr>
              <tr>
                <th>Mobile:</th>
                <td>{address.mobile}</td>
              </tr>
              <tr>
                <th>City:</th>
                <td>{address.city}</td>
              </tr>
              <tr>
                <th>State:</th>
                <td>{address.state}</td>
              </tr>
              <tr>
                <th>Pin Code:</th>
                <td>{address.pincode}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{address.address}</td>
              </tr>
                </tbody>
            </table>
          </div>
          <hr />
          <h6 className="card-subtitle">
            <button className="btn btn-primary float-right m-1">
              {" "}
              <FaRegEdit />{" "}
            </button>
            <button className="btn btn-danger float-right m-1">
              {" "}
              <FaRegTrashAlt />{" "}
            </button>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
