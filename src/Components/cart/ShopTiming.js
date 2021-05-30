import moment from "moment";

const ShopTiming = ({from_time, to_time}) => {
    return (
        <div>
            {moment(from_time, "HH:mm:SS").format("hh:mm A")} to {moment(to_time, "HH:mm:SS").format("hh:mm A")}
        </div>
    );
};

export default ShopTiming;