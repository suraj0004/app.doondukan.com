import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOrderDetail } from 'ReduxStore/index'
import OrderDetail from 'Components/myAccount/orders/detail/OrderDetail'
import MainLayout from 'Layouts/Main'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const Detail = ({ fetchOrderDetail, orderDetail }) => {

  const {order_no} = useParams()

  useEffect(() => {
    if (order_no) {
      fetchOrderDetail(order_no);
    }
  }, [order_no,fetchOrderDetail]);


  return (
    <MainLayout>
      <div className="page-padding-top">
      <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li class="breadcrumb-item"><Link to={`/my-account`}>My Account</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Order Detail</li>
          </ol>
        </nav>
        <div className="row p-3">
          {
            (orderDetail.loading || !orderDetail.data)
              ? "Loading"
              : <OrderDetail data={orderDetail.data} />
          }
        </div>
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    orderDetail: state.orderDetail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderDetail: (order_no) => dispatch(fetchOrderDetail(order_no)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);