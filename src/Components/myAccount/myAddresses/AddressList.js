import React from "react";
import AddressItem from "./AddressItem";
import AddAddress from './AddAddress';

const AddressList = ({ myAddresses }) => {
  return (
    <div className="row">
      <AddAddress/>
      {myAddresses.map((address) => {
        return <AddressItem address={address} key={address.id} />;
      })}
    </div>
  );
};

export default AddressList;
