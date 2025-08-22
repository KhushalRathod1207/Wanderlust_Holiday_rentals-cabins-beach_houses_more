import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchListings } from "../api";

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query") || "";

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setResults([]);
            setLoading(false);
            return;
        }

        const fetchResults = async () => {
            try {
                setLoading(true);
                const listings = await searchListings(searchQuery);
                setResults(listings); // <-- this must match backend
            } catch (err) {
                console.error("Search error:", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchQuery]);

    return (
        <div className="container my-5">
            <h2 className="mb-4">
                Search Results for <span className="text-danger">"{searchQuery}"</span>
            </h2>

            {loading ? (
                <p className="text-muted">Loading...</p>
            ) : results.length === 0 ? (
                <div className="alert alert-warning">
                    No listings found for "{searchQuery}"
                </div>
            ) : (
                <div className="row g-4">
                    {results.map((listing) => (
                        <div className="col-sm-12 col-md-6 col-lg-4" key={listing._id}>
                            <div className="card shadow-sm h-100 border-0 search-card">
                                <img
                                    src={listing.image?.url || "https://via.placeholder.com/300x220"}
                                    alt={listing.title}
                                    className="card-img-top"
                                    style={{ height: "220px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title mb-1">{listing.title}</h5>
                                    <p className="card-text text-muted mb-2">📍 {listing.location}</p>
                                    <p className="fw-bold text-danger mb-3">₹{listing.price.toLocaleString("en-IN")}</p>
                                    <Link
                                        to={`/listings/${listing._id}`}
                                        className="btn btn-danger mt-auto"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .search-card {
                    border-radius: 10px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .search-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                }
                .btn-danger {
                    border-radius: 50px;
                    transition: background-color 0.2s ease;
                }
                .btn-danger:hover {
                    background-color: #b71c1c;
                }
            `}</style>
        </div>
    );
};

export default SearchResults;
