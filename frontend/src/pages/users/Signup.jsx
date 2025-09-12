import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";   // ✅ Import Link
import { signupUser } from "../../api";
import '../../index.css';

const Signup = ({ setCurrUser }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        agree: false,
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const togglePassword = () => setShowPassword(prev => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Frontend validation
        if (!formData.username.trim()) newErrors.username = "Username is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        if (!formData.password.trim()) newErrors.password = "Password is required.";
        if (!formData.agree) newErrors.agree = "You must agree to terms.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const user = await signupUser({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });

                setCurrUser(user);
                setFormData({ username: "", email: "", password: "", agree: false });
                navigate("/listings");
            } catch (err) {
                console.error(err);
                setServerError(err.response?.data?.message || "Signup failed. Try again.");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-10">
                <div className="card shadow-lg p-4">
                    <h2 className="text-center mb-4">Sign Up on Wanderlust</h2>

                    {serverError && (
                        <div className="alert alert-danger">{serverError}</div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Username */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.username}</div>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.email}</div>
                        </div>

                        {/* Password */}
                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <i
                                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={togglePassword}
                                style={{
                                    position: "absolute",
                                    top: "72%",
                                    right: "15px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    color: "gray",
                                }}
                            ></i>
                            <div className="invalid-feedback">{errors.password}</div>
                        </div>

                        {/* Agree terms */}
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className={`form-check-input ${errors.agree ? "is-invalid" : ""}`}
                                id="invalidCheck"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Agree to terms and conditions
                            </label>
                            <div className="invalid-feedback">{errors.agree}</div>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn btn-dark w-100">
                            Sign Up
                        </button>
                    </form>

                    {/* ✅ Login link */}
                    <p className="text-center mt-3">
                        Already have an account?{" "}
                        <Link to="/login" className="text-decoration-none fw-bold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
