import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProducts } from "ReduxStore/index";
import ProductList from "Components/product/ProductList";
import { useEffect } from "react";
import ProductLoader from "Components/product/ProductLoader";
import MainLayout from "Layouts/Main";
import { Link } from "react-router-dom";

function Products({ fetchProducts, products, global }) {
  const { shop_slug, category_slug } = useParams();

  useEffect(() => {
    if (shop_slug && category_slug) {
      fetchProducts(shop_slug, category_slug);
    }
  }, [shop_slug, category_slug, fetchProducts]);

  return (
    <MainLayout>
      <div className="page-padding-top">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/${shop_slug}`}>Categories</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Products
            </li>
          </ol>
        </nav>
        <div className="row">
          {global.loading ? (
            <ProductLoader />
          ) : (
            <ProductList products={products.data} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    global: state.global,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (shop_slug, category_slug) =>
      dispatch(fetchProducts(shop_slug, category_slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
