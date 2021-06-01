import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { updateCartProduct, deleteCartProduct } from 'ReduxStore/index';
import { connect } from 'react-redux';

function UpdateProductQty({className, item, updateCartProduct, deleteCartProduct}) {

    const addQuantity = (item) => {
        item.quantity++
        updateCartProduct(item);
      }
    
      const subQuantity = (item) => {
        item.quantity--
        if(item.quantity){
          updateCartProduct(item);
        }else{
          deleteCartProduct(item);
        }
      }

    return (
        <>
           <div className={`btn-group btn-group-toggle btn-sm ${className}`} data-toggle="buttons">
          <label className="btn btn-outline-danger btn-sm p-0 m-0">
            <button className="btn btn-sm"  onClick={() => subQuantity(item)} > <FaMinus /> </button>
          </label>
          <label className="btn ">
            {item.quantity}
          </label>
          <label className="btn btn-outline-primary btn-sm  p-0 m-0">
            <button className="btn btn-sm"  onClick={() => addQuantity(item)}> <FaPlus /> </button>
          </label>
        </div>  
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateCartProduct: (item) => dispatch(updateCartProduct(item)),
      deleteCartProduct: (item) => dispatch(deleteCartProduct(item)),
    }
  }

  
  
  export default connect(null, mapDispatchToProps)(UpdateProductQty);