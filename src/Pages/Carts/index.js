import React from 'react';
import MainLayout from 'Layouts/Main'
import { Link } from 'react-router-dom';

const index = () => {
    return (
        <MainLayout>
            <div className="page-padding-top">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">All Cart</li>
                    </ol>
                </nav>
                <div className="text-center h2 p-2">
                    Work is in Progress
        </div>
            </div>

        </MainLayout>
    );
};

export default index;