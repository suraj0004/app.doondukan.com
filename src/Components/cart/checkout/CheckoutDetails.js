import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import CheckoutModal from "Components/modals/Checkout";
import GrandTotal from "Components/cart/GrandTotal";
import ShopInfo from "Components/common/ShopInfo";
import LoginModal from "Components/modals/Login";
import RegisterModal from "Components/modals/Register";

function CheckoutDetails({ shop_info, cart, isAuthenticated }) {
  const [checkoutModalShow, setCheckoutModal] = useState(false);
  const [loginModalShow, setLoginModal] = useState(false);
  const [regiterModalShow, setRegisterModal] = useState(false);

  let grand_total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);

  let ModalComponent, ButtonComponent;
  if (isAuthenticated) {
    ModalComponent = (
      <CheckoutModal
        show={checkoutModalShow}
        onHide={() => setCheckoutModal(false)}
        shop_info={shop_info}
        grand_total={grand_total}
      />
    );
    ButtonComponent = (
      <button
        onClick={() => setCheckoutModal(true)}
        className="btn btn-primary btn-block font-weight-bold"
      >
        Checkout
      </button>
    );
  } else {
    ModalComponent = (
      <>
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
      </>
    );
    ButtonComponent = (
      <button
        onClick={() => setLoginModal(true)}
        className="btn btn-warning btn-block font-weight-bold"
      >
        Sign-in and Continue
      </button>
    );
  }
  return (
    <>
      <ShopInfo shop_info={shop_info} />
      <hr />
      <div className="text-secondary">
        {cart.map((item) => {
          let total = item.quantity * item.product.price;
          return (
            <>
              <div className="row p-2">
                <div className="col-6 text-left p-0 m-0 ">
                  {item.product.name}
                </div>
                <div className="col-3 text-center p-0 m-0">
                  <span className="badge badge-success">
                    {item.quantity} X <FaRupeeSign size="15" />
                    {item.product.price}{" "}
                  </span>
                </div>
                <div className="col-3 text-right p-0 m-0 font-weight-bold">
                  <FaRupeeSign size="15" />
                  {total}
                </div>
              </div>
              <hr />
            </>
          );
        })}
        <GrandTotal grand_total={grand_total} />
      </div>
      <div className="row p-2">{ButtonComponent}</div>
      {ModalComponent}
    </>
  );
}

export default CheckoutDetails;
