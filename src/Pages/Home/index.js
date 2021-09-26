import React, { useEffect } from "react";
import MainLayout from "Layouts/Main";
import { connect } from "react-redux";
import { fetchShopList } from "ReduxStore";
import ShopList from "Components/home/ShopList";
const Home = ({ shops, fetchShopList }) => {
  useEffect(() => {
    fetchShopList();
  }, [fetchShopList]);

  console.log(shops);

  return (
    <MainLayout>
      <div className="page-padding-top mb-5 pb-5">
        <h1 className="text-center border-bottom mb-3 pb-3">
          Welcome to DoonDukan
        </h1>
        <h3 className="text-left">Shop\s near me ({shops.data.length})</h3>
        <div className="">
          {shops.loading ? "Loading..." : <ShopList shops={shops.data} />}
        </div>
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    shops: state.home,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShopList: () => dispatch(fetchShopList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
