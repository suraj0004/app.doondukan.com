import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import ShopTiming from "Components/cart/ShopTiming";
import {
  TimePicker,
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import GrandTotal from "Components/cart/GrandTotal";
import { authApi } from "Services/api";
import { connect } from "react-redux";
import { fetchcart, fetchAddresses } from "ReduxStore/index";
import { errorNotification, successNotification } from "Services/notification";
import { api_fail_error } from "Helpers/constant";
import { useHistory } from "react-router-dom";
import { FaRupeeSign, FaPlus } from "react-icons/fa";
import AddAddressModal from "Components/modals/AddAddress";

const Checkout = ({
  show,
  onHide,
  shop_info,
  grand_total,
  global,
  fetchcart,
  myAddresses,
  fetchAddresses,
}) => {
  let history = useHistory();

  const [deliveryMedium, setDeliveryMedium] = useState("");
  const [addressId, setAddressId] = useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedFromTime, handleFromTimeChange] = useState(null);
  const [selectedToTime, handleToTimeChange] = useState(null);
  const [addressModal, setAddressModal] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  useEffect(() => {
    if (myAddresses && myAddresses.data.length) {
      setAddressId(myAddresses.data[0].id);
    }
  }, [myAddresses]);

  const handleDeliveryMediumChange = (e) => {
    setDeliveryMedium(e.target.value);
  };
  const handleCheckout = (e) => {
    e.preventDefault();

    let payload = {
      delivery_type: deliveryMedium,
    };
    if (deliveryMedium === "user-self-collected") {
      let fromTime = selectedFromTime;
      let toTime = selectedToTime;
      if (!selectedDate) {
        errorNotification("Please select date");
        return;
      }
      if (!fromTime) {
        errorNotification("Please select from time");
        return;
      }
      if (!toTime) {
        errorNotification("Please select to time");
        return;
      }

      let date = selectedDate;
      if (selectedDate._d) {
        date = selectedDate._d;
      }

      fromTime._d.setDate(date.getDate());
      fromTime._d.setMonth(date.getMonth());
      fromTime._d.setFullYear(date.getFullYear());

      toTime._d.setDate(date.getDate());
      toTime._d.setMonth(date.getMonth());
      toTime._d.setFullYear(date.getFullYear());

      fromTime = fromTime.format("Y-MM-DD HH:mm:ss");
      toTime = toTime.format("Y-MM-DD HH:mm:ss");

      payload.fromTime = fromTime;
      payload.toTime = toTime;
    } else if (deliveryMedium === "home-delivery") {
      if (Number(grand_total) < Number(shop_info.minimum_order_amount)) {
        errorNotification(
          `Minimum Order Amount is ${shop_info.minimum_order_amount}`
        );
        return;
      }

      payload.address_id = addressId;
    }

    authApi
      .post(`order/checkout/${global.shop_slug}`, payload)
      .then((response) => {
        if (response.data.success) {
          fetchcart();
          successNotification(response.data.message);
          history.push(`/orders/${response.data.data.order_no}`);
        } else {
          errorNotification(response.data.message);
        }
      })
      .catch((err) => {
        errorNotification(api_fail_error);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="checkout-modal"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="checkout-modal">
          Pickup/Delivery information
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h3 className="text-center">
          <ShopTiming
            from_time={shop_info.open_at}
            to_time={shop_info.close_at}
          />
        </h3>
        <hr />
        <Form onSubmit={handleCheckout}>
          <div className="form-group">
            <label className="font-weight-bold">Delivery medium</label>
            <select
              className="form-control"
              value={deliveryMedium}
              onChange={handleDeliveryMediumChange}
            >
              <option value="">-- Select delivery medium--</option>
              <option value="user-self-collected">I will go to shop</option>
              {shop_info.delivery_medium !== "user-self-collected" ? (
                <option value="home-delivery">Home Delivery</option>
              ) : null}
            </select>
          </div>

          {deliveryMedium === "user-self-collected" ? (
            <>
              <h5 className="text-center h5">
                Self Collection Date and Timing
              </h5>
              <div className="text-center" id="checkout-date-selector">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  {window.innerWidth <= 450 ? ( // for mobile devices
                    <DatePicker
                      autoOk
                      clearable
                      disablePast
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  ) : (
                    <DatePicker
                      autoOk
                      clearable
                      disablePast
                      value={selectedDate}
                      onChange={handleDateChange}
                      orientation="landscape"
                      variant="static"
                    />
                  )}
                </MuiPickersUtilsProvider>
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="text-center">
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        label="From Time"
                        value={selectedFromTime}
                        minutesStep={5}
                        onChange={handleFromTimeChange}
                        clearable
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        label="To Time"
                        value={selectedToTime}
                        minutesStep={5}
                        onChange={handleToTimeChange}
                        clearable
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </div>
            </>
          ) : deliveryMedium === "home-delivery" ? (
            <div>
              <div className="border rounded p-2">
                {myAddresses.data.map((address) => {
                  return (
                    <>
                      <div className="row ">
                        <div className="col-2">
                          <input
                            type="radio"
                            value={address.id}
                            checked={addressId === address.id}
                            onChange={() => setAddressId(address.id)}
                            className="form-control"
                          />{" "}
                        </div>
                        <div className="col-10">
                          {address.name}
                          <br />
                          {address.mobile}
                          <br />
                          {address.address}
                          <br />
                          {address.pincode}, {address.city}, {address.state}
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}

                <div className="text-right">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    type="button"
                    onClick={() => setAddressModal(true)}
                  >
                    <FaPlus className="mb-2" /> Add New Address
                  </button>
                </div>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Minimum Order Amount: </th>
                    <td>
                      {" "}
                      <FaRupeeSign size="15" />
                      {shop_info.minimum_order_amount}
                    </td>
                  </tr>
                  <tr>
                    <th>Maximum Delivery Distance: </th>
                    <td>{shop_info.order_within_km} km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}

          <hr />

          <div className="pr-3 pl-3">
            <GrandTotal
              grand_total={grand_total}
              deliveryCharges={shop_info.delivery_charges}
              deliveryMedium={deliveryMedium}
            />
          </div>

          <Button
            className="font-weight-bold __stick-to-bottom"
            block
            variant="primary"
            type="submit"
          >
            Confirm & place order
          </Button>
        </Form>
        <AddAddressModal
          show={addressModal}
          onHide={() => setAddressModal(false)}
        />
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    global: state.global,
    myAddresses: state.myAddresses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchcart: () => dispatch(fetchcart()),
    fetchAddresses: () => dispatch(fetchAddresses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
