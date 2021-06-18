import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  FaUserAlt,
  FaKey,
  FaUserPlus,
  FaSpellCheck,
  FaEdit,
} from "react-icons/fa";
import {
  doRegister,
  syncCart,
  sendMobileVerificationOTP,
} from "ReduxStore/index";
import { connect } from "react-redux";
import { errorNotification } from "Services/notification";

const Register = ({
  show,
  onHide,
  doRegister,
  showLogin,
  syncCart,
  sendMobileVerificationOTP,
}) => {
  const [otpModal, setOtpModal] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    password: "",
    c_password: "",
    remember: true,
    otp: "",
  });

  const setPhone = (e) => {
    setForm({
      ...form,
      phone: e.target.value,
    });
  };

  const setOtp = (e) => {
    setForm({
      ...form,
      otp: e.target.value,
    });
  };

  const setPassword = (e) => {
    setForm({
      ...form,
      password: e.target.value,
    });
  };

  const setConfirmPassword = (e) => {
    setForm({
      ...form,
      c_password: e.target.value,
    });
  };

  const setRemember = () => {
    setForm({
      ...form,
      remember: !form.remember,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    doRegister(form).then(() => {
      syncCart();
      onHide();
    });
  };

  const isFormValid = () => {
    if (!form.phone) {
      errorNotification("Phone is required");
      return false;
    }
    if (!form.password) {
      errorNotification("Password is required");
      return false;
    }
    if (form.password !== form.c_password) {
      errorNotification("Confirmed password not match");
      return false;
    }
    return true;
  };

  const sendOtp = () => {
    if (isFormValid()) {
      const payload = {
        mobile: form.phone,
        type: "sign_up_otp",
      };
      sendMobileVerificationOTP(payload).then(() => {
        setOtpModal(true);
      });
    }
  };
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="login-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="login-modal">Sign up to start shopping</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {otpModal ? (
          <div className="row">
            <div className="col-12">
              <p className="text-center font-weight-bold">
                {" "}
                Mobile verification, OTP send to{" "}
                <button
                  className="btn m-0 p-0 text-primary"
                  onClick={() => setOtpModal(false)}
                >
                  {form.phone} <FaEdit size={25} className="mb-2" />{" "}
                </button>{" "}
              </p>
            </div>

            <div className="col-12">
              <input
                type="number"
                className="form-control"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={setOtp}
              />
            </div>
            <div className="col-12 pt-4">
              <button
                type="button"
                onClick={handleRegister}
                className="btn btn-primary btn-block"
              >
                Confirm OTP
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <form onSubmit={handleRegister}>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mobile"
                  value={form.phone}
                  onChange={setPhone}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <FaUserPlus />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={form.password}
                  onChange={setPassword}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <FaKey />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={form.c_password}
                  onChange={setConfirmPassword}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <FaSpellCheck />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={form.remember}
                      onChange={setRemember}
                    />
                    <label htmlFor="remember" role="button">
                      &nbsp; Remember Me
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mt-3 mb-3">
                <div className="col-12">
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="btn btn-primary btn-block"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              {/* <a href="/" className="btn btn-block btn-danger">
                            <FaLock /> I forgot my password
                        </a> */}
              <button onClick={showLogin} className="btn btn-block btn-success">
                <FaUserAlt /> Already have an account? <br /> Sign In
              </button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    doRegister: (payload) => dispatch(doRegister(payload)),
    syncCart: () => dispatch(syncCart()),
    sendMobileVerificationOTP: (payload) =>
      dispatch(sendMobileVerificationOTP(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
