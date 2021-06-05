import React from "react";
import ShopCard from "./ShopCard";

const ShopList = ({ shops }) => {
  return (
    <div className="">
      {shops.map((shop) => {
        return <ShopCard shop={shop} key={shop.id} />;
      })}
    </div>
  );
};

export default ShopList;
