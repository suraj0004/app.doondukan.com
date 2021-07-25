import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { upddateAddress, fetchAddresses } from "ReduxStore/index";
import { connect } from "react-redux";

const EditAddress = ({
  show,
  onHide,
  upddateAddress,
  fetchAddresses,
  address,
}) => {
  const [form, setForm] = useState({
    address_id: address.id,
    name: address.name,
    mobile: address.mobile,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    address: address.address,
  });

  const setFormField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    upddateAddress(form).then(() => {
      fetchAddresses();
      onHide();
    });
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="add-address-modal"
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-address-modal">Edit Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  placeholder="Enter Name"
                  onChange={setFormField}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={form.mobile}
                  placeholder="Enter Mobile"
                  onChange={setFormField}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={form.city}
                  placeholder="Enter City"
                  onChange={setFormField}
                />
              </div>
              <div className="form-group col-md-4">
                <label>State</label>
                <select
                  className="form-control"
                  onChange={setFormField}
                  name="state"
                  value={form.state}
                >
                  <option value="">Choose...</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={form.pincode}
                  placeholder="Enter Pin Code"
                  onChange={setFormField}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                className="form-control"
                placeholder="Enter Address"
                onChange={setFormField}
                name="address"
                value={form.address}
              ></textarea>
            </div>

            <div className="row mt-3 mb-3">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    upddateAddress: (payload) => dispatch(upddateAddress(payload)),
    fetchAddresses: () => dispatch(fetchAddresses()),
  };
};

export default connect(null, mapDispatchToProps)(EditAddress);
