import React from 'react';
import {Link }from 'react-router-dom';
import { useParams } from "react-router-dom";


function CategoryCard({category}) {
    const {shop_slug} = useParams()
    return (
        <Link to={`${shop_slug}/${category.slug}`}>
            <div className="card bg-dark text-white shadow-lg p-3 mb-5 bg-white rounded category">
                <img
                    src={category.thumbnail}
                    className="card-img-top img-fluid"
                    alt={category.name}
                />
                <div className="card-img-overlay">
                    <h5 className="card-title category_label">{category.name} ({category.product_count}) </h5>
                </div>
            </div>
        </Link>
    );
}

export default CategoryCard;