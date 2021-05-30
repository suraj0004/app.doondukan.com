import React from 'react';
import ContentLoader from 'react-content-loader'
import _ from 'lodash'

function ProductLoader(props) {
    return (
        <>
            {
                _.times(6, (i) => {
                    return <div className="col-lg-6 col-12 mb-5" key={i}>
                        <ContentLoader
                            speed={2}
                            viewBox="0 0 570 230"
                            backgroundColor="#D7D7D7"
                            foregroundColor="#FFFFFF"
                            {...props}
                        >
                            <rect x="0" y="0" rx="5" ry="5" width="570" height="230" />
                        </ContentLoader>
                    </div>
                })
            }
        </>
    );
}

export default ProductLoader;