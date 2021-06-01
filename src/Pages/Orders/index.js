import { useEffect } from 'react';
import OrderList from 'Components/myAccount/orders/OrderList'
import { connect } from 'react-redux';
import { fetchOrders } from 'ReduxStore/index'
import MainLayout from 'Layouts/Main'
import { Link } from 'react-router-dom';


const Orders = ({ fetchOrders, orders }) => {

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <MainLayout>
      <div className="page-padding-top">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li class="breadcrumb-item"><Link to={`/my-account`}>My Account</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Orders</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-12">
        
            {
              orders.loading
                ? "Loading..."
                : <OrderList orders={orders.data} />
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.orders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);