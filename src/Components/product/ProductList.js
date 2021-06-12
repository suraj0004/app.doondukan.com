import React from 'react';
import ProductCard from './ProductCard'

function ProductList({ products }) {
    return (
        <>
            {
                (products.length)
                ?products.map(product => {
                    return <div className="col-lg-6 col-12 p-0 m-0">
                        <ProductCard product={product} key={product.id} />
                    </div>
                })
                :<h4 className="col-12 text-center p-5"> Oops! No products found under this category</h4>
            }
        </>
    );
}

export default ProductList;