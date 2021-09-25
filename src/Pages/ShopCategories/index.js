import { connect } from "react-redux";
import { fetchCategories, setShopSlug, fetchProductSearchResult } from "ReduxStore/index.js";
import CategoryList from "Components/category/CategoryList";
import { useEffect, useState } from "react";
import CategoryLoader from "Components/category/CategoryLoader";
import MainLayout from "Layouts/Main";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AsyncPaginate } from "react-select-async-paginate";

function ShopCategories({ fetchCategories, categories, setShopSlug }) {

  const [searchProduct, setSearchProduct] = useState(null);

  const { shop_slug } = useParams();

  useEffect(() => {
    if (shop_slug) {
      fetchCategories(shop_slug);
      setShopSlug(shop_slug);
    }
  }, [shop_slug, fetchCategories, setShopSlug]);


  const history = useHistory();
  const handleProductClick = (selectedProduct) => {
    setSearchProduct(selectedProduct);
    history.push(selectedProduct.value);
  }

  return (
    <MainLayout>
      <div className="page-padding-top">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Categories
            </li>
          </ol>
        </nav>
        <nav>
          <div class="breadcrumb p-0 rounded mb-3 ">
            <AsyncPaginate
              className="form-control p-0 m-0"
              value={searchProduct}
              loadOptions={fetchProductSearchResult}
              debounceTimeout={500}
              onChange={handleProductClick}
              additional={{
                page: 1,
                shop_slug: shop_slug
              }}
            />
          </div>
        </nav>

        <div className="row">
          {categories.loading ? (
            <CategoryLoader />
          ) : (
            <CategoryList categories={categories.data} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (shop_slug) => dispatch(fetchCategories(shop_slug)),
    setShopSlug: (shop_slug) => dispatch(setShopSlug(shop_slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCategories);
