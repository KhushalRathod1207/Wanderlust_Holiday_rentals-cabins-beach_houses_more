import React from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const Loader = ({ loadingUser }) => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100"
            style={{
                background: "linear-gradient(135deg, #e3f2fd, #bbdefb, #90caf9)",
                overflow: "hidden",
            }}
        >
            {/* Smooth fade-in animation using Framer Motion */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <ClipLoader
                    color="#0d6efd"
                    loading={loadingUser}
                    size={100}
                    cssOverride={{
                        borderWidth: "6px",
                        boxShadow: "0 0 20px rgba(13, 110, 253, 0.3)",
                    }}
                    aria-label="Loading Spinner"
                />
            </motion.div>

            {/* Optional Text Below Spinner */}
            <motion.p
                className="mt-4 text-dark fw-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ letterSpacing: "0.5px" }}
            >
                Loading Wanderlust...
            </motion.p>
        </div>
    );
};

export default Loader;
