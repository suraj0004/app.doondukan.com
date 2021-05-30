import React from 'react';
import ProductCard from './ProductCard'

function ProductList({ products }) {
    return (
        <>
            {
                products.map(product => {
                    return <div className="col-lg-6 col-12 p-0 m-0">
                        <ProductCard product={product} key={product.id} />
                    </div>
                })
            }
        </>
    );
}

export default ProductList;