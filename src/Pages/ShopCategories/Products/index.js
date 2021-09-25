import { useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProducts } from "ReduxStore/index";
import ProductList from "Components/product/ProductList";
import { useEffect, useState } from "react";
import ProductLoader from "Components/product/ProductLoader";
import MainLayout from "Layouts/Main";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { DebounceInput } from "react-debounce-input";

function Products({ fetchProducts, products, global }) {
  const queryParam = new URLSearchParams(useLocation().search);
  const { shop_slug, category_slug } = useParams();
  const [search, setSearch] = useState(queryParam.get("search"));

  useEffect(() => {
    if (shop_slug && category_slug) {
      fetchProducts(shop_slug, category_slug, search);
    }
  }, [shop_slug, category_slug, fetchProducts]);

  const handleProductSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    fetchProducts(shop_slug, category_slug, search);
  };

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
        <nav>
        <div class="shadow p-0 rounded">
          <label class="sr-only" for="product_search_bar">
            Search for products
          </label>
          <div class="input-group mb-2">
            <DebounceInput
              value={search}
              type="text"
              class="form-control"
              id="product_search_bar"
              placeholder="Search for products"
              debounceTimeout={1000}
              onChange={handleProductSearch}
            />

            <div class="input-group-prepend">
              <div class="input-group-text">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>
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
    fetchProducts: (shop_slug, category_slug, search) =>
      dispatch(fetchProducts(shop_slug, category_slug, search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
