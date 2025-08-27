import axios from "axios";

// Backend base URL
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3008";


// ----------------- Listings -----------------

// Get all listings
export const fetchListings = async () => {
    const res = await axios.get(`${API_BASE}/listings`, { withCredentials: true });
    return res.data.listings || [];
};

// Get a single listing by ID
export const fetchListingById = async (id) => {
    const res = await axios.get(`${API_BASE}/listings/${id}`, { withCredentials: true });
    return res.data.success ? res.data.listing : null;
};

// Create new listing (still uses FormData if you want image in the future)
export const createListing = async (formData) => {
    const res = await axios.post(`${API_BASE}/listings`, formData, { withCredentials: true });
    return res.data.success ? res.data.listing : null;
};

// Update listing WITHOUT image
// Update listing WITHOUT image

export const updateListing = async (id, formData) => {
    try {
        const response = await axios.put(
            `http://localhost:3008/listings/${id}`,
            formData,
            { withCredentials: true } // important if using session
        );
        return response.data.listing;
    } catch (err) {
        console.error(err.response?.data || err);
        throw err;
    }
};



// Delete listing
export const deleteListing = async (id) => {
    const res = await axios.delete(`${API_BASE}/listings/${id}`, { withCredentials: true });
    return res.data; // { success: true, message: "Listing deleted" }
};


// Delete profile
export const deleteProfile = async (userId) => {
    const res = await axios.delete(`${API_BASE}/profile/${userId}`, { withCredentials: true });
    return res.data; // { success: true, message: "User, listings, and reviews deleted successfully!" }
};


// ----------------- Reviews -----------------
export const createReview = async (listingId, reviewData) => {
    const res = await axios.post(`${API_BASE}/listings/${listingId}/reviews`, { review: reviewData }, { withCredentials: true });
    return res.data;
};

export const deleteReview = async (listingId, reviewId) => {
    const res = await axios.delete(`${API_BASE}/listings/${listingId}/reviews/${reviewId}`, { withCredentials: true });
    return res.data;
};

// ----------------- Profile -----------------
export const fetchProfile = async (userId) => {
    const res = await axios.get(`${API_BASE}/profile/${userId}`, { withCredentials: true });
    return res.data;
};

export const updateProfile = async (userId, profileData) => {
    const res = await axios.post(`${API_BASE}/profile/${userId}/update`, profileData, { withCredentials: true });
    return res.data;
};

// ----------------- Users -----------------
export const signupUser = async (user) => {
    const res = await axios.post(`${API_BASE}/users/signup`, user, { withCredentials: true });
    return res.data.success ? res.data.user : null;
};

export const loginUser = async (user) => {
    const res = await axios.post(`${API_BASE}/users/login`, user, { withCredentials: true });
    return res.data.success ? res.data.user : null;
};

export const logoutUser = async () => {
    const res = await axios.post(`${API_BASE}/users/logout`, {}, { withCredentials: true });
    return res.data.success || false;
};

export const getCurrentUser = async () => {
    try {
        const res = await axios.get(`${API_BASE}/users/current`, { withCredentials: true });
        return res.data.success ? res.data.user : null;
    } catch (err) {
        console.error("Error fetching current user:", err);
        return null;
    }
};

// ----------------- Search -----------------
export const searchListings = async (query) => {
    const res = await axios.get(`${API_BASE}/search?query=${encodeURIComponent(query)}`, { withCredentials: true });
    return res.data.listings || [];
};

// ----------------- Categories -----------------
export const fetchListingsByCategory = async (category) => {
    const res = await axios.get(`${API_BASE}/categories/category/${category}`, { withCredentials: true });
    return res.data.listings || [];
};
