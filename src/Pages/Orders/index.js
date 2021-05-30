import { useEffect } from 'react';
import BackHeader from 'Components/BackHeader'
import OrderList from 'Components/myAccount/orders/OrderList'
import { connect } from 'react-redux';
import { fetchOrders } from 'ReduxStore/index'
import MainLayout from 'Layouts/Main'

const Orders = ({ fetchOrders, orders }) => {

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <MainLayout>
      <BackHeader />
      <div className="pt-200">
        <div className="row">
          <div className="col-12">
            <h3 className="h3 pb-2">Showing All orders
                   {/* <button className="btn border bg-light float-right"> <FaFilter/> Filter </button> */}
            </h3>
            <hr />
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