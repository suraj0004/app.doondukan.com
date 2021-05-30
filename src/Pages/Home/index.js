import React from 'react';
import MainLayout from 'Layouts/Main'

const Home = () => {
  return (
    <MainLayout>
      <h3 className="header_h3">
        <div className="container ">
          All Categories
        </div>
      </h3>

      <div className="pt-200">
        <h1 className="text-center">Welcome to DoonDukan</h1>
      </div>
    </MainLayout>
  );
};

export default Home;