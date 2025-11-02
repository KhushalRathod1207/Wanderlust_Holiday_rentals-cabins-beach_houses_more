import React, { useEffect, useState } from "react";
import { fetchListings, fetchListingsByCategory } from "../../api";
import "../../index.css";

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
    { name: "Arctics", icon: "fa-snowflake" },
    { name: "Pools", icon: "fa-person-swimming" },
];

const ListingIndex = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        if (activeCategory === "All") {
            loadAllListings();
        } else {
            filterByCategory(activeCategory);
        }
    }, [activeCategory]);

    const loadAllListings = async () => {
        setActiveCategory("All");
        setLoading(true);
        try {
            const data = await fetchListings();
            setListings(data);
        } catch (err) {
            console.error(err);
            setListings([]);
        }
        setLoading(false);
    };

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

            {/* Categories Horizontal Scroll */}
            <div className="d-flex overflow-auto mb-4 categories-slider">
                <button
                    className={`category-btn btn me-2 ${activeCategory === "All" ? "active" : ""}`}
                    onClick={loadAllListings}
                >
                    <i className="fa-solid fa-list fa-lg"></i>
                    <span className="ms-2">All Listings</span>
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        className={`category-btn btn me-2 ${activeCategory === cat.name ? "active" : ""}`}
                        onClick={() => filterByCategory(cat.name)}
                    >
                        <i className={`fa-solid ${cat.icon} fa-lg`}></i>
                        <span className="ms-2">{cat.name}</span>
                    </button>
                ))}
            </div>

            {/* Listings */}
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
            ) : listings.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {listings.map((listing) => (
                        <div className="col" key={listing._id}>
                            <a
                                href={`/listings/${listing._id}`}
                                className="text-decoration-none text-dark"
                            >
                                <div className="card h-100 listing-card shadow-sm border-0">
                                    <img
                                        src={listing.image?.url || "https://via.placeholder.com/300x200"}
                                        alt={listing.title}
                                        className="card-img-top"
                                        style={{ height: "20rem", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <p className="card-text flex-grow-1 mb-2">
                                            <b>{listing.title}</b>
                                            <br />
                                            <span className="text-muted">{listing.description}</span>
                                        </p>
                                        <div className="fw-bold">₹{listing.price?.toLocaleString("en-IN") || 0} / night</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center my-5">
                    <p className="mb-4">No listings found.</p>

                </div>
            )}

            {/* Inline Styles */}
            <style>{`
        .categories-slider {
          padding-bottom: 0.5rem;
        }
        .category-btn {
          white-space: nowrap;
          border-radius: 50px;
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
        }
        .category-btn.active {
          background-color: #343a40;
          color: #fff;
          border-color: #343a40;
        }
        .category-btn:hover {
          background-color: #343a40;
          color: #fff;
        }
        .listing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.12);
          transition: all 0.3s ease;
        }
        .skeleton-image {
          width: 100%;
          height: 200px;
          background-color: #e0e0e0;
          animation: pulse 1.5s infinite;
        }
        .skeleton-line {
          height: 15px;
          background-color: #e0e0e0;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.25rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .btn-lg:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(0,0,0,0.15);
        }
      `}</style>
        </div>
    );
};

export default ListingIndex;
