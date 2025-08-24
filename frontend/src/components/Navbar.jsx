import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import '../index.css';


const Navbar = ({ currUser, setCurrUser }) => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

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
            <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom fixed-top">
                <div className="container-fluid px-3">
                    {/* Mobile top bar */}
                    <div className="d-md-none d-flex align-items-center w-100 justify-content-between">
                        {/* Hamburger */}
                        <button
                            className="navbar-toggler border-0 p-1 me-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarContent"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Logo */}
                        <Link className="navbar-brand mx-auto d-flex align-items-center" to="/listings">
                            <i className="fa-regular fa-compass fs-3 text-danger"></i>
                        </Link>

                        {/* Search & User */}
                        <div className="d-flex align-items-center">
                            <button
                                className="btn user_btn me-2"
                                type="button"
                                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                            >
                                <span className="user_icon"><i className="fa-solid fa-magnifying-glass"></i></span>
                            </button>

                            <div className="dropdown">
                                <button className="btn user_btn" type="button" data-bs-toggle="dropdown">
                                    <span className="user_icon"><i className="fa-solid fa-user"></i></span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-animate">
                                    {!currUser ? (
                                        <>
                                            <li><Link className="dropdown-item hover-slide" to="/signup">Sign Up</Link></li>
                                            <li><Link className="dropdown-item hover-slide" to="/login">Log In</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link className="dropdown-item hover-slide" to={`/profile/${currUser._id}`}>Profile</Link></li>
                                            <li><button className="dropdown-item hover-slide" onClick={handleLogout}>Log Out</button></li>
                                        </>
                                    )}
                                    <hr className="dropdown-hr" />
                                    <li><Link className="dropdown-item hover-slide" to="#">Help Center</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Logo */}
                    <Link className="navbar-brand d-none d-md-flex align-items-center me-4" to="/listings">
                        <i className="fa-regular fa-compass fs-3 text-danger me-2"></i>
                        <span className="fw-bold">Wanderlust</span>
                    </Link>

                    {/* Collapse menu */}
                    <div className="collapse navbar-collapse bg-white" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link className="nav-link active fw-semibold px-3 hover-scale" to="/listings">Explore</Link>
                            </li>
                            {currUser && (
                                <li className="nav-item">
                                    <Link className="nav-link active fw-semibold px-3 hover-scale" to="/listings/new">Wanderlust your home</Link>
                                </li>
                            )}
                        </ul>

                        {/* Desktop search */}
                        <form onSubmit={handleSearch} className="d-none d-md-flex mx-4 search-form">
                            <div className="searchbar border rounded-pill w-100">
                                <input
                                    className="search_input"
                                    type="text"
                                    placeholder="Where would you like to go?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="search_icon" type="submit">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>

                        {/* Desktop user dropdown */}
                        <div className="dropdown d-none d-md-block">
                            <button className="btn user_btn hover-grow" type="button" data-bs-toggle="dropdown">
                                <span className="user_icon"><i className="fa-solid fa-user"></i></span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-animate">
                                {!currUser ? (
                                    <>
                                        <li><Link className="dropdown-item hover-slide" to="/signup">Sign Up</Link></li>
                                        <li><Link className="dropdown-item hover-slide" to="/login">Log In</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link className="dropdown-item hover-slide" to={`/profile/${currUser._id}`}>Profile</Link></li>
                                        <li><button className="dropdown-item hover-slide" onClick={handleLogout}>Log Out</button></li>
                                    </>
                                )}
                                <hr className="dropdown-hr" />
                                <li><Link className="dropdown-item hover-slide" to="#">Help Center</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile search */}
            <div
                id="mobileSearchBar"
                className={`d-md-none w-100 bg-white p-3 border-bottom mobile-search ${mobileSearchOpen ? "open" : ""}`}
            >
                <form className="d-flex" onSubmit={handleSearch}>
                    <input
                        className="form-control rounded-start-pill border-end-0 search-input-mobile"
                        type="text"
                        placeholder="Where would you like to go?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-danger rounded-end-pill border-start-0 px-3 search-btn-mobile" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </>
    );
};

export default Navbar;
