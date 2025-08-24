import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchListings } from "../api";
import '../index.css';



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
                setResults(listings);
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
        <div className="container my-5" style={{ marginTop: "100px" }}>
            {loading ? (
                <p className="text-muted text-center">Loading...</p>
            ) : results.length === 0 ? (
                <h3 className="text-center my-5 text-danger">
                    No listings found for "{searchQuery}"
                </h3>
            ) : (
                <>
                    <h3 className="text-center my-3">
                        Search Results for "<span className="text-danger">{searchQuery}</span>"
                    </h3>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                        {results.map((listing) => (
                            <Link
                                to={`/listings/${listing._id}`}
                                key={listing._id}
                                className="link-list text-decoration-none text-dark"
                            >
                                <div className="col">
                                    <div className="card h-100 shadow-sm search-card">
                                        <img
                                            src={listing.image?.url || "https://via.placeholder.com/300x220"}
                                            className="card-img-top"
                                            alt={listing.title}
                                            style={{ height: "20rem", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <p className="card-text flex-grow-1 mb-2">
                                                <b>{listing.title}</b>
                                                <br />
                                                <span className="text-muted">{listing.description}</span>
                                            </p>
                                            <div className="fw-bold mb-2">
                                                ₹{listing.price.toLocaleString("en-IN")}/ night
                                                <i className="tex_info" style={{ display: "none" }}>
                                                    &nbsp;+18% GST
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}


        </div>
    );
};

export default SearchResults;
