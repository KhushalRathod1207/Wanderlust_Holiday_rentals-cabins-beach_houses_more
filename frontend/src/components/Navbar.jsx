import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import "../index.css";

const Navbar = ({ currUser, setCurrUser }) => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Unified search handler
    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setSearchQuery("");
        if (mobileSearchOpen) setMobileSearchOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            setCurrUser(null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm fixed-top">
                <div className="container-fluid px-3">
                    {/* Mobile top bar */}
                    <div className="d-md-none d-flex align-items-center w-100 justify-content-between">
                        <button
                            className="navbar-toggler border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarContent"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <Link className="navbar-brand mx-auto" to="/listings">
                            <i className="fa-regular fa-compass fs-3 text-danger"></i>
                        </Link>

                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-light me-2"
                                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>

                            <div className="dropdown">
                                <button className="btn btn-light" type="button" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-user"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {!currUser ? (
                                        <>
                                            <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>
                                            <li><Link className="dropdown-item" to="/login">Log In</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link className="dropdown-item" to={`/profile/${currUser._id}`}>Profile</Link></li>
                                            <li><button className="dropdown-item" onClick={handleLogout}>Log Out</button></li>
                                        </>
                                    )}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#">Help Center</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Desktop logo */}
                    <Link className="navbar-brand d-none d-md-flex align-items-center me-4" to="/listings">
                        <i className="fa-regular fa-compass fs-3 text-danger me-2"></i>
                        <span className="fw-bold text-dark">Wanderlust</span>
                    </Link>

                    {/* Collapse menu */}
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold px-3" to="/listings">Explore</Link>
                            </li>
                            {currUser && (
                                <li className="nav-item">
                                    <Link className="nav-link fw-semibold px-3" to="/listings/new">Wanderlust your home</Link>
                                </li>
                            )}
                        </ul>

                        {/* Desktop search */}
                        <form className="d-flex p-2" onSubmit={handleSearch}>
                            <input
                                className="form-control rounded-start-pill border-end-0"
                                type="text"
                                placeholder="Where would you like to go?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-danger rounded-end-pill border-start-0 px-3" type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>

                        {/* Desktop user dropdown */}
                        <div className="dropdown d-none d-md-block">
                            <button className="btn btn-light" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-user"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {!currUser ? (
                                    <>
                                        <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>
                                        <li><Link className="dropdown-item" to="/login">Log In</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link className="dropdown-item" to={`/profile/${currUser._id}`}>Profile</Link></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Log Out</button></li>
                                    </>
                                )}
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="#">Help Center</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile search overlay */}
            <div
                className={`bg-light shadow-sm d-md-none ${mobileSearchOpen ? "d-block" : "d-none"}`}
                style={{ position: "absolute", top: "56px", left: 0, right: 0, zIndex: 1050 }}
            >
                <form className="d-flex p-2" onSubmit={handleSearch}>
                    <input
                        className="form-control rounded-start-pill border-end-0"
                        type="text"
                        placeholder="Where would you like to go?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-danger rounded-end-pill border-start-0 px-3" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </>
    );
};

export default Navbar;
