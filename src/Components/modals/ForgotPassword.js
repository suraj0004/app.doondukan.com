import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FaUserAlt, FaKey, FaEdit, FaFingerprint, FaSpellCheck } from "react-icons/fa";
import { doResetPassword, sendForgotPasswordOtp } from "ReduxStore/index";
import { connect } from "react-redux";
import { errorNotification } from "Services/notification";
import CountDown from "Components/common/CountDown";
import { ClipLoader } from "react-spinners";

function Loader() {
  return <ClipLoader loading color="#0069d9" />;
}

const ForgotPassword = ({
  show,
  onHide,
  doResetPassword,
  showLogin,
  sendForgotPasswordOtp,
}) => {
  const [resetPassword, showResetPassword] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
    password_confirmation: "",
    otp: "",
  });

  const setPhone = (e) => {
    setForm({
      ...form,
      mobile: e.target.value,
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

  const setPasswordConfirmation = (e) => {
    setForm({
      ...form,
      password_confirmation: e.target.value,
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    doResetPassword(form).then(() => {
      showLogin();
    });
  };

  const sendOtp = () => {
    if (!form.mobile) {
      errorNotification("Please enter a mobile number.");
      return;
    }
    const payload = {
      mobile: form.mobile,
      type: "forget_password",
    };
    setOtpLoader(true);
    sendForgotPasswordOtp(payload).then(() => {
      showResetPassword(true);
      setResendOtp(false);
    }).finally(() => {
      setOtpLoader(false);
    });
  };

  useEffect(() => {
    setForm({
      mobile: "",
      password: "",
      password_confirmation: "",
      otp: "",
    });
    showResetPassword(false);
  }, [show]);
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="login-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="login-modal">Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <form onSubmit={handleResetPassword}>
            {resetPassword ? (
              <>
                <p className="text-center font-weight-bold">
                  Forgot Password OTP has been sent to
                  <button
                    className="btn p-0 text-primary m-1"
                    onClick={() => showResetPassword(false)}
                  >
                    {form.mobile} <FaEdit size={25} className="mb-2" />
                  </button>
                </p>
                <p className="text-center font-weight-bold">
                  {resendOtp ? (
                    <>
                      {otpLoader ? (
                        <Loader />
                      ) : (
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={sendOtp}
                        >
                          Resend OTP
                        </button>
                      )}
                    </>
                  ) : (
                    <CountDown
                      seconds={60}
                      onComplete={() => setResendOtp(true)}
                    />
                  )}
                </p>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="OTP"
                    value={form.otp}
                    onChange={setOtp}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <FaFingerprint />
                    </div>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
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
                    value={form.password_confirmation}
                    onChange={setPasswordConfirmation}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <FaSpellCheck />
                    </div>
                  </div>
                </div>

                <div className="row mt-3 mb-3">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">
                      Reset Password
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Mobile"
                    value={form.mobile}
                    onChange={setPhone}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <FaUserAlt />
                    </div>
                  </div>
                </div>

                <div className="row mt-3 mb-3">
                  <div className="col-12 text-center">
                    {otpLoader ? (
                      <Loader />
                    ) : (
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="btn btn-primary btn-block"
                      >
                        Forgot Password
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </form>

          <div className="social-auth-links text-center mb-3">
            <p>- OR -</p>

            <button onClick={showLogin} className="btn btn-block btn-success">
              <FaUserAlt /> Already have an account? <br /> Sign In
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    doResetPassword: (payload) => dispatch(doResetPassword(payload)),
    sendForgotPasswordOtp: (payload) =>
      dispatch(sendForgotPasswordOtp(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
