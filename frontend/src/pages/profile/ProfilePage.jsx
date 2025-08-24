import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProfile, updateProfile, deleteProfile } from "../../api";
import '../../index.css';

const ProfilePage = ({ currUser }) => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        mobileNo: "",
        gender: "",
        address: "",
        country: "",
        city: "",
        location: "",
    });

    // Fetch user profile
    useEffect(() => {
        const getProfile = async () => {
            try {
                const data = await fetchProfile(id);
                setUser(data.user);
                setListings(data.listings || []);
                setFormData({
                    username: data.user.username || "",
                    email: data.user.email || "",
                    mobileNo: data.user.mobileNo || "",
                    gender: data.user.gender || "",
                    address: data.user.address || "",
                    country: data.user.country || "",
                    city: data.user.city || "",
                    location: data.user.location || "",
                });
            } catch (err) {
                console.error(err);
            }
        };
        getProfile();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProfile(id, formData);
            setUser(res.user);
            alert(res.message || "Profile updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update profile. Try again.");
        }
    };

    const handleDeleteProfile = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        try {
            const data = await deleteProfile(id);
            if (data.success) {
                alert(data.message);
                window.location.href = "/login";
            } else {
                alert(data.error || "Failed to delete profile.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };


    if (!user) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="container my-5" style={{ maxWidth: "900px" }}>
            <h2 className="text-center mb-5">My Profile</h2>

            {/* Profile Form */}
            <div className="card shadow-sm rounded-3 p-4 mb-5 bg-white border-0">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Username</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Mobile No</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Gender</label>
                            <select
                                className="form-select form-select-lg"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Address</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Country</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">City</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">Location</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-danger btn-lg w-100">
                        Update Profile
                    </button>

                    <div className="text-center mt-3">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-lg"
                            onClick={handleDeleteProfile}
                        >
                            Delete My Account
                        </button>
                    </div>
                </form>
            </div>

            {/* User Listings */}
            {currUser && currUser._id === id && (
                <div className="mb-5">
                    <h3 className="text-center mb-4">My Listings</h3>
                    {listings.length > 0 ? (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                            {listings.map(listing => (
                                <div key={listing._id} className="col">
                                    <Link to={`/listings/${listing._id}`} className="text-decoration-none text-dark">
                                        <div className="card h-100 shadow-sm border-0 hover-shadow transition">
                                            <img
                                                style={{ height: "220px", objectFit: "cover" }}
                                                src={listing.image?.url || "https://via.placeholder.com/300x200"}
                                                className="card-img-top rounded-top"
                                                alt={listing.title}
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{listing.title}</h5>
                                                <p className="card-text text-muted flex-grow-1">
                                                    {listing.description.length > 80
                                                        ? listing.description.substring(0, 80) + "..."
                                                        : listing.description}
                                                </p>
                                                <div className="fw-bold text-danger">
                                                    ₹{listing.price.toLocaleString("en-IN")}/night
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted text-center">No listings found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
