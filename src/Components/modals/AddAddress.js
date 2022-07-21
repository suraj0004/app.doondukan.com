import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { addAddress, fetchAddresses } from "ReduxStore/index";
import { connect } from "react-redux";
import { errorNotification } from "Services/notification";
import GoogleMaps from "Components/common/GoogleMap";
import { convertAddressToLatLng } from "Services/googleMap";

const AddAddress = ({ show, onHide, addAddress, global, fetchAddresses }) => {
  const myMap = useRef(null);
  const formInitialState = {
    name: global.user.name || "",
    mobile: global.user.phone,
    city: "",
    state: "",
    pincode: "",
    address: "",
    lat: 0,
    lng: 0,
  };
  const [form, setForm] = useState(formInitialState);

  const [convertedLatLng, setConvertedLatLng] = useState({
    lat: 0,
    lng: 0,
  });

  // step: 1 -> Address form, 2 -> Map (lat,lng)
  const stepForm = {
    form: 1,
    map: 2,
  };
  const [step, setStep] = useState(stepForm.form);

  const setFormField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleHide = () => {
    setForm(formInitialState);
    setStep(stepForm.form);
    onHide();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress({
      ...form,
      lat: myMap.current.map_.getCenter().lat(),
      lng: myMap.current.map_.getCenter().lng(),
    }).then(() => {
      fetchAddresses();
      handleHide();
    });
  };

  const handleNext = () => {
    for (const key in form) {
      if (
        Object.hasOwnProperty.call(form, key) &&
        !form[key] &&
        key !== "lat" &&
        key !== "lng"
      ) {
        errorNotification(`please provide your ${key}`);
        return;
      }
    }
    convertAddressToLatLng(`${form.address} ${form.city}`)
      .then((res) => {
        console.log(res);
        setConvertedLatLng(res);
        setStep(stepForm.map);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePrev = () => {
    setStep(stepForm.form);
  };

  return (
    <Modal
      show={show}
      onHide={handleHide}
      aria-labelledby="add-address-modal"
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-address-modal">Add new Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <form onSubmit={handleSubmit}>
            <AddressFields
              form={form}
              setFormField={setFormField}
              hide={step !== stepForm.form}
            />
            <AddressMap
              hide={step !== stepForm.map}
              {...convertedLatLng}
              ref={myMap}
            />

            <FormButton
              step={step}
              stepForm={stepForm}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const FormButton = ({ step, stepForm, handleNext, handlePrev }) => {
  if (step === stepForm.form) {
    return (
      <div className="row mt-3 mb-3">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  } else if (step === stepForm.map) {
    return (
      <div className="row mt-3 mb-3">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-outline-secondary btn-block"
            onClick={handlePrev}
          >
            Back
          </button>
        </div>
        <div className="col-6">
          <button type="submit" className="btn btn-success btn-block">
            Save
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const AddressFields = ({ form, setFormField, hide = false }) => {
  return (
    <div className={hide ? "d-none" : "d-block"}>
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
    </div>
  );
};

const AddressMap = React.forwardRef(({ hide = false, lat, lng }, ref) => {
  return (
    <div className={hide ? "d-none" : "d-block"}>
      {lat && lng ? <GoogleMaps lat={lat} lng={lng} ref={ref} /> : null}
    </div>
  );
});

const mapStateToProps = (state, ownProps) => {
  return {
    global: state.global,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAddress: (payload) => dispatch(addAddress(payload)),
    fetchAddresses: () => dispatch(fetchAddresses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
