import React, { useEffect, useState } from "react";
import { fetchListings, fetchListingsByCategory } from "../../api";
import '../../index.css';

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
    { name: "Pools", icon: "fa-person-swimming" }
];

const ListingIndex = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("Trending");

    useEffect(() => {
        filterByCategory(activeCategory);
    }, [activeCategory]);

    const filterByCategory = async (category) => {
        setActiveCategory(category);
        setLoading(true);
        try {
            const data = await fetchListingsByCategory(category);
            setListings(data);
        } catch (err) {
            console.error(err);
            setListings([]);
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">

            {/* Categories Horizontal Slider */}
            <div className="categories-slider mb-4">
                {categories.map(cat => (
                    <button
                        key={cat.name}
                        className={`category-btn ${activeCategory === cat.name ? "active" : ""}`}
                        onClick={() => filterByCategory(cat.name)}
                    >
                        <i className={`fa-solid ${cat.icon} fa-lg`}></i>
                        <span className="ms-2">{cat.name}</span>
                    </button>
                ))}
            </div>

            {/* Skeleton Loader */}
            {loading ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {[...Array(6)].map((_, i) => (
                        <div className="col" key={i}>
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
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {listings.length > 0 ? (
                        listings.map(listing => (
                            <div className="col" key={listing._id}>
                                <a
                                    href={`/listings/${listing._id}`}
                                    className="link-list text-decoration-none text-dark"
                                >
                                    <div className="card h-100 listing-card">
                                        <img
                                            style={{ height: "20rem", objectFit: "cover" }}
                                            src={listing.image?.url || "https://via.placeholder.com/300x200"}
                                            className="card-img-top"
                                            alt={listing.title}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <p className="card-text flex-grow-1">
                                                <b>{listing.title}</b><br />
                                                <span className="text-muted">{listing.description}</span>
                                            </p>
                                            <div>₹{listing.price?.toLocaleString("en-IN") || 0}/ night</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No listings found.</p>
                    )}
                </div>
            )}

            {/* Skeleton + Categories CSS */}
            <style>{`
                /* Skeleton Loader */
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

                /* Listing Card Hover */
                .listing-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .listing-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
                }

                /* Categories slider */
                .categories-slider {
                    display: flex;
                    overflow-x: auto;
                    gap: 0.5rem;
                    padding-bottom: 0.5rem;
                }
                .categories-slider::-webkit-scrollbar {
                    display: none;
                }
                .category-btn {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ddd;
                    background: #fff;
                    padding: 0.4rem 0.8rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
             
                .category-btn.active {
                    border-color: #007bff;
                    color: #007bff;
                }
                .category-btn i {
                    margin-right: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default ListingIndex;
