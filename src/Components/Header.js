import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux';
import LoginModal from "Components/modals/Login"
import RegisterModal from "Components/modals/Register"
import { Link } from 'react-router-dom';

const Header = ({ cart_count, global }) => {

  const [loginModalShow, setLoginModal] = useState(false);
  const [regiterModalShow, setRegisterModal] = useState(false);

  return (
    <Navbar className="fixed_header">
      <div className="container">
        <Navbar.Brand >
          {
            (global.shop_slug)
              ? <Link to={`/${global.shop_slug}`} className="brand h1" role="button" >Shop Name</Link>
              : <Link to="/" className="brand h1" role="button" >DoonDukan</Link>
          }
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="m-2" role="button">
            <Link to={`/${global.shop_slug}/cart`} className="nav-link" >
              <FaShoppingCart size="40" />
              <span className="badge badge-danger cart_count">{cart_count}</span>
            </Link>
          </Navbar.Text>
          <Navbar.Text className="m-2">
            {
              global.isAuthenticated
                ? <Link to="/my-account" className="btn nav-link"><FaUserCircle size="40" role="button" /></Link>
                : <button onClick={() => setLoginModal(true)} className="btn nav-link"><FaUserCircle size="40" role="button" /></button>
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </div>
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModal(false)}
        showRegister={() => {
          setLoginModal(false);
          setRegisterModal(true);
        }}
      />
      <RegisterModal
        show={regiterModalShow}
        onHide={() => setRegisterModal(false)}
        showLogin={() => {
          setRegisterModal(false);
          setLoginModal(true);
        }}
      />
    </Navbar>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cart_count: state.cart.data.length,
    global: state.global
  }
}


export default connect(mapStateToProps)(Header);