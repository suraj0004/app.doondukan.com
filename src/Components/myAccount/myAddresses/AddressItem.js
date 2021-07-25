import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { deleteAddress, fetchAddresses } from "ReduxStore/index";
import { connect } from "react-redux";


const AddressItem = ({ address, onEdit, deleteAddress, fetchAddresses }) => {
  const onDelete = (id) => {
    deleteAddress(id).then(() => {
      fetchAddresses();
    })
  }
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
            <button
              className="btn btn-primary float-right m-1"
              onClick={() => onEdit(address)}
            >
              <FaRegEdit />
            </button>
            <button className="btn btn-danger float-right m-1" onClick={() => onDelete(address.id)}>
              <FaRegTrashAlt />
            </button>
          </h6>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAddress: (id) => dispatch(deleteAddress(id)),
    fetchAddresses: () => dispatch(fetchAddresses()),
  };
};

export default connect(null, mapDispatchToProps)(AddressItem);
