import { useEffect } from 'react';
import AddressList from 'Components/myAccount/myAddresses/AddressList'
import { connect } from 'react-redux';
import { fetchAddresses } from 'ReduxStore/index'
import MainLayout from 'Layouts/Main'
import { Link } from 'react-router-dom';


const MyAddresses = ({ fetchAddresses, myAddresses }) => {

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <MainLayout>
      <div className="page-padding-top">
      <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/my-account`}>My Account</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Addresses</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-12">
        
            {
              myAddresses.loading
                ? "Loading..."
                : <AddressList myAddresses={myAddresses.data} />
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    myAddresses: state.myAddresses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddresses: () => dispatch(fetchAddresses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddresses);