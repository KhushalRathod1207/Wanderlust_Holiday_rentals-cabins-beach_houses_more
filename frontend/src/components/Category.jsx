import React, { useState, useEffect } from "react";
import { fetchListings, fetchListingsByCategory } from "../api"; // adjust path
import { Link } from "react-router-dom";
import "../index.css"; // your custom styles here

const categories = [
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

    useEffect(() => {
        const loadListings = async () => {
            setLoading(true);
            try {
                const data = category
                    ? await fetchListingsByCategory(category)
                    : await fetchListings();
                setListings(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadListings();
    }, [category]);

    const handleCategoryClick = async (categoryName) => {
        setLoading(true);
        try {
            const data = await fetchListingsByCategory(categoryName);
            setListings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center my-3">Listing for "{category || 'All'}"</h3>

            {/* Filters */}
            <div className="filters-wrapper mb-4 d-flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        className="btn btn-light d-flex flex-column align-items-center"
                        onClick={() => handleCategoryClick(cat.name)}
                    >
                        <i className={`fa-solid ${cat.icon} fa-2x`}></i>
                        <p className="mb-0">{cat.name}</p>
                    </button>
                ))}
            </div>

            {/* Tax Toggle */}
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
                        Display taxes
                    </label>
                </div>
            </div>

            {/* Skeleton Loader */}
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
                            <Link
                                to={`/listings/${listing._id}`}
                                className="link-list text-decoration-none text-dark"
                            >
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
                                            {showTaxes && <i>&nbsp; +18% GST</i>}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <h3 className="text-center my-5 text-danger">
                    Listings are not available for "{category}"
                </h3>
            )}

            {/* Skeleton CSS */}
            <style>{`
                .skeleton-image {
                    height: 200px;
                    background: linear-gradient(-90deg, #eeeeee 0%, #f5f5f5 50%, #eeeeee 100%);
                    background-size: 400% 400%;
                    animation: shimmer 1.2s ease-in-out infinite;
                }
                .skeleton-line {
                    height: 15px;
                    border-radius: 8px;
                    background: linear-gradient(-90deg, #eeeeee 0%, #f5f5f5 50%, #eeeeee 100%);
                    background-size: 400% 400%;
                    animation: shimmer 1.2s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }
                .listing-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .listing-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                }
            `}</style>
        </div>
    );
};

export default Category;
