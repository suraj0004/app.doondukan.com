import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import ShopTiming from "Components/cart/ShopTiming"
import { TimePicker, MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import GrandTotal from "Components/cart/GrandTotal";
import { authApi } from "Services/api"
import { connect } from 'react-redux';
import { fetchcart } from 'ReduxStore/index';
import { errorNotification, successNotification } from "Services/notification"
import { api_fail_error } from "Helpers/constant"
import { useHistory } from "react-router-dom";



const Checkout = ({ show, onHide, open_at, close_at, grand_total, global, fetchcart }) => {

    let history = useHistory();

    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedFromTime, handleFromTimeChange] = useState(null);
    const [selectedToTime, handleToTimeChange] = useState(null);

    const handleCheckout = (e) => {
        e.preventDefault();

        let fromTime = selectedFromTime;
        let toTime = selectedToTime;

        if (!selectedDate) {
            alert('Please select date')
            return
        }
        if (!fromTime) {
            alert('Please select from time')
            return
        }
        if (!toTime) {
            alert('Please select to time')
            return
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

        fromTime = fromTime.format("Y-MM-DD HH:mm:ss")
        toTime = toTime.format("Y-MM-DD HH:mm:ss")

        const payload = {
            fromTime: fromTime,
            toTime: toTime
        }

        authApi.post(`order/checkout/${global.shop_slug}`, payload)
            .then(response => {
                if (response.data.success) {
                    fetchcart();
                    successNotification(response.data.message)
                    history.push(`/orders/${response.data.data.order_no}`)
                } else {
                    errorNotification(response.data.message)
                }
            }).catch(err => {
                errorNotification(api_fail_error)
            })
    }



    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="login-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="login-modal">
                    Pickup/Delivery information
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h3 className="text-center">
                    <ShopTiming
                        from_time={open_at}
                        to_time={close_at}
                    />
                </h3>
                <hr />
                <Form onSubmit={handleCheckout}>

                        <h5 className="text-center h5">Pick-Up Date and Timing</h5>
                        <div className="text-center" id="checkout-date-selector">
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            {
                                (window.innerWidth <= 450) // for mobile devices
                                ? <DatePicker
                                autoOk
                                clearable
                                disablePast
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                                : <DatePicker
                                autoOk
                                clearable
                                disablePast
                                value={selectedDate}
                                onChange={handleDateChange}
                                orientation="landscape"
                                variant="static"
                            />
                            }
                           
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
                    <hr />

                    <div className="pr-3 pl-3">
                        <GrandTotal grand_total={grand_total} />
                    </div>

                    <Button className="font-weight-bold" block variant="primary" type="submit">
                        Confirm & place order
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        global: state.global,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchcart: () => dispatch(fetchcart())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Checkout);