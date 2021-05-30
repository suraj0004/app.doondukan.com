import React from 'react';
import CategoryCard from './CategoryCard'

function CategoryList({ categories }) {
    return (
        <>
            {
                categories.map((category) => {
                    return <div className="col-md-3 ">
                        <CategoryCard category={category} />
                    </div>
                })
            }
        </>
    );
}

export default CategoryList;