import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    fetchListingById,
    createReview,
    deleteReview,
    deleteListing,
} from "../../api";
import "../../index.css";

const ShowListing = ({ currUser }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviewForm, setReviewForm] = useState({ rating: 1, comment: "" });

    // Fetch listing by ID
    const getListing = async () => {
        try {
            setLoading(true);
            const data = await fetchListingById(id);
            setListing(data);
        } catch (err) {
            console.error("Error fetching listing:", err);
            setListing(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getListing();
    }, [id]);

    if (loading) return <p className="text-center mt-5">Loading listing...</p>;
    if (!listing) return <p className="text-center mt-5">Listing not found.</p>;

    const isOwner = currUser && listing.owner?._id?.toString() === currUser._id;

    // Review form input
    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewForm({ ...reviewForm, [name]: value });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await createReview(id, reviewForm);
            setReviewForm({ rating: 1, comment: "" });
            await getListing();
        } catch (err) {
            console.error(err.response?.data || err);
            alert(err.response?.data?.message || "Failed to submit review");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Delete this review?")) return;
        try {
            await deleteReview(id, reviewId);
            await getListing();
        } catch (err) {
            console.error(err.response?.data || err);
            alert(err.response?.data?.message || "Failed to delete review");
        }
    };

    const handleDeleteListing = async () => {
        if (!window.confirm("Delete this listing?")) return;
        try {
            const res = await deleteListing(id);
            if (res.success) {
                alert(res.message);
                navigate("/listings");
            } else {
                alert(res.message || "Failed to delete listing");
            }
        } catch (err) {
            console.error(err.response?.data || err);
            alert(err.response?.data?.message || "Failed to delete listing");
        }
    };

    return (
        <div className="container mt-5">
            {/* Listing image */}
            {listing.image?.url && (
                <div className="mb-4">
                    <img
                        src={listing.image.url}
                        alt={listing.title}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
                    />
                </div>
            )}

            {/* Listing info */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h2 className="card-title mb-3">{listing.title}</h2>
                    <p className="text-muted mb-1">
                        <strong>Owner:</strong> {listing.owner?.username}
                    </p>
                    <p className="mb-2"><strong>Description:</strong> {listing.description}</p>
                    <p className="mb-1">
                        <strong>Price:</strong>{" "}
                        <span className="text-success">₹{listing.price?.toLocaleString("en-IN")}</span>
                    </p>
                    <p className="mb-1">
                        <strong>Location:</strong> {listing.location}, {listing.country}
                    </p>
                    <p className="mb-0">
                        <strong>Category:</strong>{" "}
                        <span className="badge bg-primary">{listing.category}</span>
                    </p>
                </div>

                {isOwner && (
                    <div className="card-footer d-flex gap-2">
                        <button
                            className="btn btn-warning flex-grow-1"
                            onClick={() => navigate(`/listings/${id}/edit`)}
                        >
                            Edit Listing
                        </button>
                        <button className="btn btn-danger flex-grow-1" onClick={handleDeleteListing}>
                            Delete Listing
                        </button>
                    </div>
                )}
            </div>

            {/* Review Form */}
            {currUser && (
                <div className="card shadow-sm p-4 mb-5">
                    <h4 className="mb-3">Leave a Review</h4>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Rating:</label>
                            <select
                                name="rating"
                                value={reviewForm.rating}
                                onChange={handleReviewChange}
                                className="form-select"
                            >
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>
                                        {n} star{n > 1 ? "s" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Comment:</label>
                            <textarea
                                name="comment"
                                value={reviewForm.comment}
                                onChange={handleReviewChange}
                                className="form-control"
                                rows="4"
                                placeholder="Write your review..."
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-dark w-100">
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            {/* Reviews List */}
            {listing.reviews?.length > 0 && (
                <div className="mb-5">
                    <h4 className="mb-3">All Reviews</h4>
                    <div className="row g-3">
                        {listing.reviews.map(r => {
                            const isReviewAuthor = currUser && r.author?._id?.toString() === currUser._id;
                            return (
                                <div key={r._id} className="col-md-6">
                                    <div className="card p-3 shadow-sm h-100">
                                        <div className="d-flex justify-content-between mb-2">
                                            <h6 className="mb-0">@{r.author?.username}</h6>
                                            <small className="text-muted">
                                                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                                            </small>
                                        </div>
                                        <p className="mb-1">⭐ {r.rating}</p>
                                        <p>{r.comment}</p>
                                        {isReviewAuthor && (
                                            <button
                                                className="btn btn-sm btn-outline-danger mt-2"
                                                onClick={() => handleDeleteReview(r._id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowListing;
