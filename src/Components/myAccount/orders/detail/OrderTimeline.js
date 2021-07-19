import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaListAlt, FaCheckCircle, FaBoxes } from 'react-icons/fa';
import { cancelOrder, downloadInvoice } from 'ReduxStore/index'
import { connect } from 'react-redux';

const OrderTimeline = ({status, order_no, cancelOrder, downloadInvoice, global}) => {
  const completedColor = 'rgb(33, 150, 243)';
  const inCompletedColor = 'rgb(195,195,195)';

  let colors = {
    placed : inCompletedColor,
    confirmed : inCompletedColor,
    completed : inCompletedColor,
  }

  if(status === 0 || status === 3){
    colors.placed = completedColor
  }else if(status === 1){
    colors.placed = completedColor
    colors.confirmed = completedColor
  }else if(status === 2){
    colors.placed = completedColor
    colors.confirmed = completedColor
    colors.completed = completedColor
  }
const getInvoice = () => {
  downloadInvoice(order_no)
  .then((res) =>{
    var blob = new Blob([res.data]);
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "Invoice.pdf";
    link.click();
  })
}



  return (
    (global.loading)
    ?"Loading..."
    :<VerticalTimeline layout="1-column-left" animate={false}>
      
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: colors.placed, color: '#fff' }}
        contentArrowStyle={{ borderRight: `7px solid ${colors.placed}` }}
        // date="2011 - present"
        iconStyle={{ background: colors.placed, color: '#fff' }}
        icon={<FaListAlt />}
      >
        <h6 className="vertical-timeline-element-subtitle">
          Order Placed
          <br/>
          {
            (status === 0)
            ?<button className="btn btn-danger btn-sm mt-3 font-weight-bold border" onClick={() => cancelOrder(order_no)} >Cancel Order</button>
            :(status === 3)
            ? <span class="badge badge-warning p-2 mt-3">Cancelled</span>
            :null
          }
          </h6>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        // date="November 2012"
        contentArrowStyle={{ borderRight: `7px solid ${colors.confirmed}` }}
        contentStyle={{ background: colors.confirmed , color: '#fff' }}
        iconStyle={{ background: colors.confirmed, color: '#fff' }}
        icon={<FaBoxes />}
      >
        <h6 className="vertical-timeline-element-subtitle">
          Order Confirmed</h6>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        // date="2002 - 2006"
        contentArrowStyle={{ borderRight: `7px solid ${colors.completed}` }}
        contentStyle={{ background: colors.completed, color: '#fff' }}
        iconStyle={{ background: colors.completed, color: '#fff' }}
        icon={<FaCheckCircle />}
      >
        <h6 className="vertical-timeline-element-subtitle">
          Order Completed
          <br/>
          {
            (status === 2)
            ?<button className="btn btn-success btn-sm mt-3 font-weight-bold border" onClick={getInvoice} >Download Invoice</button>
            :null
          }
          </h6>
      </VerticalTimelineElement>

    </VerticalTimeline>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    global: state.global,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelOrder: (order_no) => dispatch(cancelOrder(order_no)),
    downloadInvoice: (order_no) => dispatch(downloadInvoice(order_no)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTimeline);