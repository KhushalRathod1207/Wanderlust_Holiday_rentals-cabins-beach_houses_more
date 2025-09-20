import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loadingUser }) => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <ClipLoader
                color="#0d6efd" // Bootstrap primary blue
                loading={loadingUser}
                size={90}
                aria-label="Loading Spinner"
            />
        </div>
    );
};

export default Loader;
