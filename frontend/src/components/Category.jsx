import React, { useState, useEffect } from "react";
import { fetchListings, fetchListingsByCategory } from "../api";
import { Link } from "react-router-dom";
import "../index.css";

// Add "All Listings" as the first category
const categories = [
    { name: "All Listings", icon: "fa-list" },
    { name: "Trending", icon: "fa-fire" },
    { name: "Domes", icon: "fa-igloo" },
    { name: "Bed & Breakfast", icon: "fa-mug-saucer" },
    { name: "Top Cities", icon: "fa-city" },
    { name: "Mountains", icon: "fa-mountain" },
    { name: "Boats", icon: "fa-sailboat" },
    { name: "Container", icon: "fa-box" },
    { name: "Castles", icon: "fa-fort-awesome" },
    { name: "Frames", icon: "fa-film" },
    { name: "Mountain Sun", icon: "fa-mountain-sun" },
    { name: "Earth Homes", icon: "fa-house-crack" },
    { name: "Artics", icon: "fa-snowflake" },
    { name: "Pools", icon: "fa-person-swimming" },
];

const Category = ({ category }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTaxes, setShowTaxes] = useState(false);
    const [activeCategory, setActiveCategory] = useState(category || "All Listings");

    const handleCategoryClick = async (categoryName) => {
        setActiveCategory(categoryName);
        setLoading(true);
        try {
            if (categoryName === "All Listings") {
                const data = await fetchListings();
                setListings(data);
            } else {
                const data = await fetchListingsByCategory(categoryName);
                setListings(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (category) {
            handleCategoryClick(category);
        } else {
            handleCategoryClick("All Listings");
        }
    }, [category]);

    return (
        <div className="container mt-5" style={{ marginTop: "100px" }}>
            <h3 className="text-center my-3">Listing for "{activeCategory}"</h3>

            {/* Category Buttons */}
            <div className="filters-wrapper mb-4 d-flex flex-wrap gap-3" style={{ overflowX: "auto" }}>
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        className={`btn btn-light d-flex flex-column align-items-center ${activeCategory === cat.name ? "border border-danger" : ""
                            }`}
                        onClick={() => handleCategoryClick(cat.name)}
                    >
                        <i className={`fa-solid ${cat.icon} fa-2x`} style={{ color: "rgb(106, 106, 106)" }}></i>
                        <p className="mb-0">{cat.name}</p>
                    </button>
                ))}
            </div>

            {/* GST Toggle */}
            <div className="tax-toggle mb-4">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        checked={showTaxes}
                        onChange={() => setShowTaxes(!showTaxes)}
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                        Display GST
                    </label>
                </div>
            </div>

            {/* Listings / Skeleton */}
            {loading ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="col">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="skeleton-image rounded-top"></div>
                                <div className="card-body">
                                    <div className="skeleton-line w-75 mb-2"></div>
                                    <div className="skeleton-line w-50 mb-2"></div>
                                    <div className="skeleton-line w-25"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : listings.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {listings.map((listing) => (
                        <div key={listing._id} className="col">
                            <Link to={`/listings/${listing._id}`} className="link-list text-decoration-none text-dark">
                                <div className="card listing-card h-100">
                                    <img
                                        src={listing.image?.url || "/images/default.jpg"}
                                        className="card-img-top"
                                        alt={listing.title}
                                        style={{ height: "20rem", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <p className="card-text flex-grow-1">
                                            <b style={{ color: "#212529" }}>{listing.title}</b>
                                            <br />
                                            <span style={{ color: "#6a6a6a" }}>{listing.description}</span>
                                        </p>
                                        <div style={{ color: "#212529" }}>
                                            ₹{listing.price.toLocaleString("en-IN")}/ night
                                            <i className="tex_info" style={{ display: showTaxes ? "inline" : "none" }}>
                                                &nbsp;+18% GST
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <h3 className="text-center my-5 text-danger">Listings are not available</h3>
            )}
        </div>
    );
};

export default Category;
