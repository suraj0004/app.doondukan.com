import React, { useState } from 'react';
import { FaUserAlt, FaListAlt, FaSignOutAlt, FaShoppingCart, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { doLogOut } from 'ReduxStore/index';
import { connect } from 'react-redux';
import ProfileModal from "Components/modals/Profile"
import MainLayout from 'Layouts/Main'
import { useHistory } from "react-router-dom";


const MyAccount = ({ doLogOut, global }) => {

    const [profileModalShow, setProfileModal] = useState(false);
    let history = useHistory();

    const singOut = () => {
        doLogOut().then(() => {
            if (global.shop_slug) {
                history.push(`/${global.shop_slug}`);
            } else {
                history.push("/")
            }
        })
    }
    return (
        <MainLayout>
            <div className="page-padding-top">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">My Account</li>
                    </ol>
                </nav>
                <div className="row ">
                    <div className="col-md-2"></div>
                
                    <div className="col-md-4 mb-3">
                        <div className="card text-center">
                            <div className="card-body account-menu">
                                <h5 className="card-title link" onClick={() => setProfileModal(true)} >
                                    <FaUserAlt />  My Profile</h5>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card text-center">
                            <div className="card-body account-menu">
                                <h5 className="card-title link"> <FaHome /> <Link to="/my-addresses">My Addresses</Link> </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4 mb-3 ">
                        <div className="card text-center ">
                            <div className="card-body account-menu">
                                <h5 className="card-title link"> <FaListAlt /> <Link to="/orders"> My Orders</Link> </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card text-center">
                            <div className="card-body account-menu">
                                <h5 className="card-title link"> <FaShoppingCart /> <Link to="/all-cart"> My Shop Cart</Link></h5>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4 mb-3">
                        <div className="card text-center">
                            <div className="card-body account-menu">
                                <h5 className="card-title link" onClick={singOut} > <FaSignOutAlt /> Sign out</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {

                global.isAuthenticated
                    ? <ProfileModal
                        show={profileModalShow}
                        onHide={() => setProfileModal(false)}
                    />
                    : null
            }


        </MainLayout>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        global: state.global,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLogOut: () => dispatch(doLogOut())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);