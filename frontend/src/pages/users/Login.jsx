import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ Import Link
import { loginUser } from "../../api"; // make sure the path is correct
import '../../index.css';

const Login = ({ setCurrUser }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePassword = () => setShowPassword(prev => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Frontend validation
        if (!formData.username.trim()) newErrors.username = "Email is required.";
        if (!formData.password.trim()) newErrors.password = "Password is required.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const user = await loginUser({
                    username: formData.username,
                    password: formData.password
                });

                // Set current user and redirect
                console.log(user);
                setCurrUser(user);
                setFormData({ username: "", password: "" });
                navigate("/listings"); // redirect after successful login
            } catch (err) {
                console.error(err);
                setServerError(err.response?.data?.message || "Login failed. Try again.");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-10">
                <div className="card shadow-lg p-4">
                    <h2 className="text-center mb-4">Login to Wanderlust</h2>

                    {serverError && (
                        <div className="alert alert-danger">{serverError}</div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Username */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Email:</label>
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

                        {/* Submit */}
                        <button type="submit" className="btn btn-dark w-100">
                            Login
                        </button>
                    </form>

                    {/* ✅ Signup Link */}
                    <p className="text-center mt-3">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-decoration-none fw-bold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
