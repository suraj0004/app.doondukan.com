import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaUserAlt, FaKey, FaUserPlus, FaLock, FaSpellCheck } from 'react-icons/fa';
import { doRegister, syncCart } from 'ReduxStore/index';
import { connect } from 'react-redux';

const Register = ({show, onHide, doRegister, showLogin, syncCart}) => {
    const [form, setForm] = useState({
        phone : "",
        password : "",
        c_password : "",
        remember : true
    })

    const setPhone = (e) => {
        setForm({
            ...form,
            phone : e.target.value
        })
    } 

    const setPassword = (e) => {
        setForm({
            ...form,
            password : e.target.value
        })
    }

    const setConfirmPassword = (e) => {
        setForm({
            ...form,
            c_password : e.target.value
        })
    }

    const setRemember = () => {
        setForm({
            ...form,
            remember : !form.remember
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        doRegister(form).then(() => {
            syncCart()
            onHide()
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
                    Sign up to start shooping
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               
                    <div className="">
                        <form onSubmit={handleRegister} >
                            <div className="input-group mb-3">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Mobile"
                                    value={form.phone}
                                    onChange={setPhone}
                                    required />
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
                                    required />
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
                                    required />
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
                                            checked={ form.remember }
                                            onChange={setRemember} />
                                        <label htmlFor="remember" role="button">
                                            &nbsp; Remember Me
                                        </label>
                                    </div>
                                </div>


                            </div>

                            <div className="row mt-3 mb-3">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block"  >Sign Up</button>
                                </div>

                            </div>
                        </form>

                        <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            {/* <a href="/" className="btn btn-block btn-danger">
                                <FaLock /> I forgot my password
                            </a> */}
                            <button onClick={showLogin} className="btn btn-block btn-success">
                                <FaUserAlt /> Already have an account? <br/> Sign In
                            </button>

                        </div>
                    </div>
            </Modal.Body>
        </Modal>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        doRegister: (payload) => dispatch(doRegister(payload)),
        syncCart: () => dispatch(syncCart())
    }
}

export default connect(null, mapDispatchToProps)(Register);