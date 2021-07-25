import React, { useState } from "react";
import AddressItem from "./AddressItem";
import AddAddress from "./AddAddress";
import EditAddressModal from "Components/modals/EditAddress";

const AddressList = ({ myAddresses }) => {
  const [editAddressModal, setEditAddressModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const onEdit = (address) => {
    setEditAddress(address);
    setEditAddressModal(true);
  };

  return (
    <div className="row">
      <AddAddress />
      {editAddress ? (
        <EditAddressModal
          show={editAddressModal}
          onHide={() => setEditAddressModal(false)}
          address={editAddress}
        />
      ) : null}
      {myAddresses.map((address) => {
        return (
          <AddressItem address={address} key={address.id} onEdit={onEdit} />
        );
      })}
    </div>
  );
};

export default AddressList;
