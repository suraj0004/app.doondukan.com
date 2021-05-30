import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaUserAlt, FaKey, FaUserPlus, FaLock } from 'react-icons/fa';
import { doLogin, syncCart } from 'ReduxStore/index';
import { connect } from 'react-redux';

const Login = ({show, onHide, doLogin, showRegister, syncCart}) => {
    const [form, setForm] = useState({
        phone : "",
        password : "",
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

    const setRemember = () => {
        setForm({
            ...form,
            remember : !form.remember
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        doLogin(form).then(() =>{
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
                    Sign in to start shooping
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               
                    <div className="">
                        <form onSubmit={handleLogin} >
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
                                        <FaUserAlt />
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
                                    <button type="submit" className="btn btn-primary btn-block"  >Sign In</button>
                                </div>

                            </div>
                        </form>

                        <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            <a href="/" className="btn btn-block btn-danger">
                                <FaLock /> I forgot my password
                            </a>
                            <button onClick={showRegister} className="btn btn-block btn-success">
                                <FaUserPlus /> Don't have an account? Sign Up
                            </button>

                        </div>
                    </div>
            </Modal.Body>
        </Modal>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (payload) => dispatch(doLogin(payload)),
        syncCart: () => dispatch(syncCart())
    }
}

export default connect(null, mapDispatchToProps)(Login);