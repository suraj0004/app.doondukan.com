import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";
import LoginModal from "Components/modals/Login";
import RegisterModal from "Components/modals/Register";
import { Link, useLocation, useParams } from "react-router-dom";
import { setShopSlug, fetchcart } from "ReduxStore/index";
const Header = ({ cart_count, global, setShopSlug, fetchcart }) => {
  let location = useLocation();
  const [loginModalShow, setLoginModal] = useState(false);
  const [regiterModalShow, setRegisterModal] = useState(false);

  const { shop_slug } = useParams();
  useEffect(() => {
    if (shop_slug) {
      setShopSlug(shop_slug);
    }
  }, [shop_slug, setShopSlug]);

  useEffect(() => {

    // fetch from index DB
    if (!global.isAuthenticated && !location.pathname.includes("/cart")) {
      fetchcart(); 
    }
  }, [fetchcart,global,location]);

  return (
    <Navbar className="fixed_header">
      <div className="container">
        <Navbar.Brand>
          {global.shop_slug && location.pathname !== "/" ? (
            <Link
              to={`/${global.shop_slug}`}
              className="brand h1"
              role="button"
            >
              {global.shop_name}
            </Link>
          ) : (
            <Link to="/" className="brand h3" role="button">
              DoonDukan
            </Link>
          )}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to={`/${global.shop_slug}/cart`} className="nav-link p-0">
            <FaShoppingCart size="30" />
            <span className="badge badge-danger cart_count rounded-circle">
              {cart_count}
            </span>
          </Link>
          {global.isAuthenticated ? (
            <Link to="/my-account" className="btn nav-link p-0">
              <FaUserCircle size="30" role="button" />
            </Link>
          ) : (
            <button
              onClick={() => setLoginModal(true)}
              className="btn nav-link link p-0"
            >
              <FaUserCircle size="30" role="button" />
            </button>
          )}
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
    global: state.global,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShopSlug: (shop_slug) => dispatch(setShopSlug(shop_slug)),
    fetchcart: () => dispatch(fetchcart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
