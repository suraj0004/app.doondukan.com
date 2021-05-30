import React from 'react';
import {withRouter }from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useHistory } from "react-router-dom";

const BackHeader = () => {
    let history = useHistory();

    return (
        <h3 className="header_h3">
        <div className="container ">
            <button type="button" onClick={()=>history.goBack()} className="btn"> <FaRegArrowAltCircleLeft size="35" /> </button> Back
        </div>
    </h3>
    );
};

export default withRouter(BackHeader);