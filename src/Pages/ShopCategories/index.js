import { connect } from 'react-redux';
import { fetchCategories, setShopSlug } from 'ReduxStore/index.js'
import CategoryList from 'Components/category/CategoryList'
import { useEffect } from 'react';
import CategoryLoader from 'Components/category/CategoryLoader'
import MainLayout from 'Layouts/Main'
import { useParams } from "react-router-dom";

function ShopCategories({ fetchCategories, categories, setShopSlug }) {

  const {shop_slug} = useParams()

  useEffect(() => {
    if (shop_slug) {
      fetchCategories(shop_slug);
      setShopSlug(shop_slug);
    }
  }, [shop_slug,fetchCategories,setShopSlug]);
  return (
    <MainLayout>
      <h3 className="header_h3">
        <div className="container ">
          All Categories
        </div>
      </h3>
      <div className="pt-200">
        <div className="row">
          {
            categories.loading
              ? <CategoryLoader />
              : <CategoryList categories={categories.data} />
          }
        </div>
      </div>
    </MainLayout>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (shop_slug) => dispatch(fetchCategories(shop_slug)),
    setShopSlug: (shop_slug) => dispatch(setShopSlug(shop_slug))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCategories);