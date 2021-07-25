import { connect } from 'react-redux';
import CartList from 'Components/cart/CartList'
import CheckoutDetails from "Components/cart/checkout/CheckoutDetails"
import { fetchcart, setShopSlug } from 'ReduxStore/index';
import { useEffect } from 'react';
import MainLayout from 'Layouts/Main'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function Cart({ cart, global, fetchcart, setShopSlug }) {
  const { shop_slug } = useParams()


  useEffect(() => {
    if (shop_slug) {
      setShopSlug(shop_slug);
      fetchcart();
    }
  }, [shop_slug, setShopSlug, fetchcart]);


  return (
    <MainLayout>
      <div className="page-padding-top">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/${shop_slug}`}>Categories</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Cart</li>
          </ol>
        </nav>
        <div className="row p-3" id="cart-container">
          {
            (!cart.data.length)
              ? <div className="col-12" > <h3 className="h3 text-center">Your Cart is empty </h3> </div>
              : <>
                <div className="col-lg-7 p-1 card">
                  {
                    (global.loading)
                      ? "Loading"
                      : <CartList cart={cart.data} />
                  }
                </div>

                <div className="col-lg-1">
                  <br />
                </div>

                <div className="col-lg-4 bg-white border">
                  {
                    (cart.shop_info.loading || !cart.shop_info.data)
                      ? "Loading"
                      : <CheckoutDetails
                        shop_info={cart.shop_info.data}
                        cart={cart.data}
                        isAuthenticated={global.isAuthenticated}
                      />
                  }
                </div>
              </>
          }

        </div>
      </div>
    </MainLayout>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart,
    global: state.global,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchcart: () => dispatch(fetchcart()),
    setShopSlug: (shop_slug) => dispatch(setShopSlug(shop_slug))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
