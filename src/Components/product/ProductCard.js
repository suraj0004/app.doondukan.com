import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { addToCart } from 'ReduxStore/index';
import { connect } from 'react-redux';
import UpdateProductQty from 'Components/cart/UpdateProductQty'

function ProductCard({ product, addToCart, cart }) {

    let item = cart.data.find( row => (row.product_id === product.id) )
    return (
        <div className="card shadow-lg m-0 p-0 m-3 ">
            <div className="row m-0 p-0 product">
                <div className="col-md-4 text-center m-0 p-0">
                    <img
                        src={product.thumbnail}
                        className="img-fluid"
                        alt={product.name}
                    />
                </div>
                <div className="col-md-8">
                    {
                        (item)
                        ?<UpdateProductQty className="add-to-cart-btn" item={item} />
                        :<button onClick={() => addToCart(product)} className="btn btn-outline-primary add-to-cart-btn ">Add <FaPlus /> </button>
                    }
                    <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <p className="card-text">
                        <span className="h4">{product.price}</span> / {product.weight}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch(addToCart(product))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      cart: state.cart,
    }
  }
  


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);