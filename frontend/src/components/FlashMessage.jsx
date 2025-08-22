// components/FlashMessage.jsx
import React from "react";

const FlashMessage = ({ successMsg, errorMsg }) => {
    if (!successMsg && !errorMsg) return null;

    return (
        <div
            className={`flash-message alert alert-dismissible fade show d-flex align-items-center col-6 offset-3 ${successMsg ? "alert-success" : "alert-danger"
                }`}
            role="alert"
        >
            <i className="bi bi-check-circle-fill me-2"></i>
            <span>{successMsg || errorMsg}</span>
            <button
                type="button"
                className="btn-close ms-auto"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
};

export default FlashMessage;
