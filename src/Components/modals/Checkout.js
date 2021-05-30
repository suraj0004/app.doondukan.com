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

        let fromDate = selectedFromTime;
        let toDate = selectedToTime;

        if (!selectedDate) {
            alert('Please select date')
            return
        }
        if (!fromDate) {
            alert('Please select from time')
            return
        }
        if (!toDate) {
            alert('Please select to time')
            return
        }

        if (selectedDate._d) {
            handleDateChange(selectedDate._d)
        }

        fromDate._d.setDate(selectedDate.getDate());
        fromDate._d.setMonth(selectedDate.getMonth());
        fromDate._d.setFullYear(selectedDate.getFullYear());

        toDate._d.setDate(selectedDate.getDate());
        toDate._d.setMonth(selectedDate.getMonth());
        toDate._d.setFullYear(selectedDate.getFullYear());

        fromDate = fromDate.format("Y-MM-DD HH:mm:ss")
        toDate = toDate.format("Y-MM-DD HH:mm:ss")

        const payload = {
            fromDate: fromDate,
            toDate: toDate
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
                    <Form.Group controlId="formGroupEmail">

                        <div className="text-center h6">Pick-Up Date and Timing</div>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                                autoOk
                                clearable
                                disablePast
                                value={selectedDate}
                                onChange={handleDateChange}
                                orientation="landscape"
                                variant="static"
                                format="YYYY"
                            />
                        </MuiPickersUtilsProvider>

                    </Form.Group>

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