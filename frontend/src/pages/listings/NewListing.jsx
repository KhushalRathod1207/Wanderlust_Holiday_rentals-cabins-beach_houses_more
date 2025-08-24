import React, { useState } from "react";
import { createListing } from "../../api";
import { useNavigate } from "react-router-dom";
import '../../index.css';

const NewListing = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        country: "",
        category: "",
        location: "",
        image: null
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required.";
        if (!formData.description) newErrors.description = "Description is required.";
        if (!formData.price) newErrors.price = "Price is required.";
        if (!formData.country) newErrors.country = "Country is required.";
        if (!formData.category) newErrors.category = "Category is required.";
        if (!formData.location) newErrors.location = "Location is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitting(true);

        try {
            // Prepare FormData
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("country", formData.country);
            data.append("category", formData.category);
            data.append("location", formData.location);
            if (formData.image) data.append("image", formData.image);

            // API call
            const listing = await createListing(data);

            if (listing) {
                alert("Listing created successfully!");
                navigate("/listings");
            } else {
                alert("Failed to create listing. Try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Error creating listing. Check console for details.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h2 className="mb-4">Create a New Listing</h2>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate encType="multipart/form-data">

                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input
                            type="text"
                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                            name="title"
                            placeholder="Enter listing title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.title}</div>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea
                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                            name="description"
                            rows="4"
                            placeholder="Enter listing description"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                        <div className="invalid-feedback">{errors.description}</div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Upload Image</label>
                        <input
                            type="file"
                            className={`form-control ${errors.image ? "is-invalid" : ""}`}
                            name="image"
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.image}</div>
                    </div>

                    <div className="row g-3">

                        {/* Price */}
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Price</label>
                            <input
                                type="number"
                                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                name="price"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.price}</div>
                        </div>

                        {/* Country */}
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Country</label>
                            <input
                                type="text"
                                className={`form-control ${errors.country ? "is-invalid" : ""}`}
                                name="country"
                                placeholder="Enter country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.country}</div>
                        </div>

                        {/* Category */}
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Category</label>
                            <select
                                name="category"
                                className={`form-select ${errors.category ? "is-invalid" : ""}`}
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select a category</option>
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
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Location</label>
                            <input
                                type="text"
                                className={`form-control ${errors.location ? "is-invalid" : ""}`}
                                name="location"
                                placeholder="Surat, Gujarat"
                                value={formData.location}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">{errors.location}</div>
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="form-check my-3">
                        <input type="checkbox" className="form-check-input" required />
                        <label className="form-check-label">Agree to terms and conditions</label>
                        <div className="invalid-feedback">You must agree before submitting.</div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-dark w-100" disabled={submitting}>
                        {submitting ? "Submitting..." : "Add Listing"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewListing;
