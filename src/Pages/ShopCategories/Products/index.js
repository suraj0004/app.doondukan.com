import { useParams } from "react-router-dom"
import { connect } from 'react-redux'
import { fetchProducts } from 'ReduxStore/index'
import ProductList from 'Components/product/ProductList'
import { useEffect } from 'react'
import ProductLoader from 'Components/product/ProductLoader'
import MainLayout from 'Layouts/Main'
import BackHeader from "Components/BackHeader"

function Products({ fetchProducts, products, global }) {

  const {shop_slug,category_slug} = useParams()



  useEffect(() => {
    shop_slug && category_slug && fetchProducts(shop_slug, category_slug);
  }, [shop_slug, category_slug,fetchProducts]);


  return (
    <MainLayout>
      <BackHeader/>
      <div className="pt-200">
        <div className="row">
          {
            global.loading
              ? <ProductLoader />
              : <ProductList products={products.data} />
          }
        </div>
      </div>
    </MainLayout>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    global: state.global,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (shop_slug, category_slug) => dispatch(fetchProducts(shop_slug, category_slug))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);