import React from "react";
import '../index.css';


const Error = ({ message }) => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="alert alert-danger shadow-lg p-4 rounded text-center" role="alert">
                        <h4 className="alert-heading">
                            <i className="bi bi-exclamation-circle-fill"></i> Error
                        </h4>
                        <p className="fs-5">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
