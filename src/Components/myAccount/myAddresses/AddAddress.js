import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddAddressModal from "Components/modals/AddAddress";

const AddAddress = () => {
  const [addressModal, setAddressModal] = useState(false);

  return (
    <>
      <div className="col-12 pb-3" onClick={() => setAddressModal(true)}>
        <div className="card shadow ">
          <div className="card-body add-address-placeholder rounded">
            <FaPlus className="mb-2" /> Add Address
          </div>
        </div>
      </div>
      <AddAddressModal
        show={addressModal}
        onHide={() => setAddressModal(false)}
      />
    </>
  );
};

export default AddAddress;
