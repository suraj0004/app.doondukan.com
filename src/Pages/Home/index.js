import React from 'react';
import MainLayout from 'Layouts/Main'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <MainLayout>

      <div className="page-padding-top mb-5 pb-5">
        <h1 className="text-center">Welcome to DoonDukan</h1>
        <p className="text-center font-weight-bold h5">
          Click Here : <Link to='1-test-shop'>  Test Shop </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default Home;