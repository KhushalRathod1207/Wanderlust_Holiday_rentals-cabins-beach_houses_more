import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchListingById, updateListing } from "../../api";
import '../../index.css';

const ListingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    country: "",
    category: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch listing data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const listing = await fetchListingById(id);
        if (!listing) {
          alert("Listing not found");
          navigate("/listings");
          return;
        }
        setFormData({
          title: listing.title || "",
          description: listing.description || "",
          price: listing.price || "",
          country: listing.country || "",
          category: listing.category || "",
          location: listing.location || "",
        });
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err);
        alert("Failed to fetch listing");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-5">Loading listing...</p>;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      // Send flat formData directly
      const updated = await updateListing(id, formData);
      if (updated) {
        alert("Listing updated successfully!");
        navigate(`/listings/${id}`);
      } else {
        alert("Failed to update listing: Unknown error");
      }
    } catch (err) {
      console.error("Update error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to update listing");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Listing</h2>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={formData.title}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.title}</div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            rows="5"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.description}</div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            value={formData.price}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.price}</div>
        </div>

        {/* Country */}
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <input
            type="text"
            name="country"
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
            value={formData.country}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.country}</div>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select
            name="category"
            className={`form-select ${errors.category ? "is-invalid" : ""}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Trending">Trending</option>
            <option value="Rooms">Rooms</option>
            <option value="Boats">Boats</option>
            <option value="Mountain Sun">Mountain Sun</option>
            <option value="Farms">Farms</option>
            <option value="Container">Container</option>
            <option value="Castles">Castles</option>
            <option value="Bed Breakfast">Bed & Breakfast</option>
            <option value="Iconic Cities">Iconic Cities</option>
            <option value="Top Cities">Top Cities</option>
            <option value="Mountains">Mountains</option>
            <option value="Amazing Pools">Amazing Pools</option>
            <option value="Camping">Camping</option>
            <option value="Arctic">Arctic</option>
            <option value="Domes">Domes</option>
          </select>
          <div className="invalid-feedback">{errors.category}</div>
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            name="location"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            value={formData.location}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.location}</div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-dark" disabled={submitting}>
          {submitting ? "Updating..." : "Update Listing"}
        </button>
      </form>
    </div>
  );
};

export default ListingEdit;
