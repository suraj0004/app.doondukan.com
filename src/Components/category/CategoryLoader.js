import React from 'react';
import ContentLoader from 'react-content-loader'
import _ from 'lodash'

function CategoryLoader(props) {
    return (
        <>
            {
                _.times(8, (i) => {
                    return <div className="col-md-3 mb-5" key={i}>
                        <ContentLoader
                            speed={2}
                            viewBox="0 0 250 250"
                            backgroundColor="#D7D7D7"
                            foregroundColor="#FFFFFF"
                            {...props}
                        >
                            <rect x="0" y="0" rx="5" ry="5" width="250" height="250" />
                        </ContentLoader>
                    </div>
                })
            }
        </>
    );
}

export default CategoryLoader;