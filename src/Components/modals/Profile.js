import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaUserAlt, FaKey, FaPhone, FaSpellCheck, FaEnvelope  } from 'react-icons/fa';
import { updateProfile } from 'ReduxStore/index';
import { connect } from 'react-redux';

const Profile = ({show, onHide, global, updateProfile}) => {

    const [form, setForm] = useState({
        name : global?.user?.name?global.user.name:"",
        phone : global?.user?.phone?global.user.phone:"",
        email : global?.user?.email?global.user.email:"",
        password : "",
        password_confirmation  : "",
    })

    const setName = (e) => {
        setForm({
            ...form,
            name : e.target.value
        })
    } 

    const setPhone = (e) => {
        setForm({
            ...form,
            phone : e.target.value
        })
    } 

    const setEmail = (e) => {
        setForm({
            ...form,
            email : e.target.value
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
            password_confirmation  : e.target.value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        updateProfile(form).then(() => {
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
                    Your Profile
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               
                    <div className="">
                        <form onSubmit={handleLogin} >

                        <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={setName}
                                    required />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FaUserAlt />
                                    </div>
                                </div>
                            </div>

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
                                        <FaPhone />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={setEmail}
                                     />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FaEnvelope />
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
                                    value={form.password_confirmation }
                                    onChange={setConfirmPassword}
                                     />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FaSpellCheck />
                                    </div>
                                </div>
                            </div>
                           
                            <div className="row mt-3 mb-3">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block"  >Save</button>
                                </div>

                            </div>
                        </form>
                    </div>
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
        updateProfile: (payload) => dispatch(updateProfile(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);