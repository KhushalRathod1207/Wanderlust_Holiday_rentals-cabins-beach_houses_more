import axios from "axios";

// Backend base URL
const API_BASE = import.meta.env.VITE_API_BASE;

// ----------------- Listings -----------------

// Get all listings
export const fetchListings = async () => {
    try {
        const res = await axios.get(`${API_BASE}/listings`, { withCredentials: true });
        return res.data.listings || [];
    } catch (err) {
        console.error("Fetch Listings Error:", err.response?.data || err);
        throw err;
    }
};

// Get a single listing by ID
export const fetchListingById = async (id) => {
    try {
        const res = await axios.get(`${API_BASE}/listings/${id}`, { withCredentials: true });
        return res.data.success ? res.data.listing : null;
    } catch (err) {
        console.error("Fetch Listing By ID Error:", err.response?.data || err);
        throw err;
    }
};

// Create new listing
export const createListing = async (formData) => {
    try {
        const res = await axios.post(`${API_BASE}/listings`, formData, { withCredentials: true });
        return res.data.success ? res.data.listing : null;
    } catch (err) {
        console.error("Create Listing Error:", err.response?.data || err);
        throw err;
    }
};

// Update listing
export const updateListing = async (id, formData) => {
    try {
        const res = await axios.put(`${API_BASE}/listings/${id}`, formData, { withCredentials: true });
        return res.data.listing;
    } catch (err) {
        console.error("Update Listing Error:", err.response?.data || err);
        throw err;
    }
};

// Delete listing
export const deleteListing = async (id) => {
    try {
        const res = await axios.delete(`${API_BASE}/listings/${id}`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("Delete Listing Error:", err.response?.data || err);
        throw err;
    }
};

// ----------------- Reviews -----------------
export const createReview = async (listingId, reviewData) => {
    try {
        const res = await axios.post(
            `${API_BASE}/listings/${listingId}/reviews`,
            { review: reviewData },
            { withCredentials: true }
        );
        return res.data;
    } catch (err) {
        console.error("Create Review Error:", err.response?.data || err);
        throw err;
    }
};

export const deleteReview = async (listingId, reviewId) => {
    try {
        const res = await axios.delete(
            `${API_BASE}/listings/${listingId}/reviews/${reviewId}`,
            { withCredentials: true }
        );
        return res.data;
    } catch (err) {
        console.error("Delete Review Error:", err.response?.data || err);
        throw err;
    }
};

// ----------------- Profile -----------------
export const fetchProfile = async (userId) => {
    try {
        const res = await axios.get(`${API_BASE}/profile/${userId}`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("Fetch Profile Error:", err.response?.data || err);
        throw err;
    }
};

export const updateProfile = async (userId, profileData) => {
    try {
        const res = await axios.post(`${API_BASE}/profile/${userId}/update`, profileData, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("Update Profile Error:", err.response?.data || err);
        throw err;
    }
};

export const deleteProfile = async (userId) => {
    try {
        const res = await axios.delete(`${API_BASE}/profile/${userId}`, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.error("Delete Profile Error:", err.response?.data || err);
        throw err;
    }
};

// ----------------- Users -----------------
export const signupUser = async (user) => {
    try {
        const res = await axios.post(`${API_BASE}/users/signup`, user, { withCredentials: true });
        return res.data.success ? res.data.user : null;
    } catch (err) {
        console.error("Signup User Error:", err.response?.data || err);
        throw err;
    }
};

export const loginUser = async (user) => {
    try {
        const res = await axios.post(`${API_BASE}/users/login`, user, { withCredentials: true });
        return res.data.success ? res.data.user : null;
    } catch (err) {
        console.error("Login User Error:", err.response?.data || err);
        throw err;
    }
};

export const logoutUser = async () => {
    try {
        const res = await axios.post(`${API_BASE}/users/logout`, {}, { withCredentials: true });
        return res.data.success || false;
    } catch (err) {
        console.error("Logout User Error:", err.response?.data || err);
        throw err;
    }
};

export const getCurrentUser = async () => {
    try {
        const res = await axios.get(`${API_BASE}/users/current`, { withCredentials: true });
        return res.data.success ? res.data.user : null;
    } catch (err) {
        console.error("Get Current User Error:", err.response?.data || err);
        return null;
    }
};

// ----------------- Search -----------------
export const searchListings = async (query) => {
    try {
        const res = await axios.get(`${API_BASE}/search?query=${encodeURIComponent(query)}`, { withCredentials: true });
        return res.data.listings || [];
    } catch (err) {
        console.error("Search Listings Error:", err.response?.data || err);
        throw err;
    }
};

// ----------------- Categories -----------------
export const fetchListingsByCategory = async (category) => {
    try {
        const res = await axios.get(`${API_BASE}/categories/category/${category}`, { withCredentials: true });
        return res.data.listings || [];
    } catch (err) {
        console.error("Fetch Listings By Category Error:", err.response?.data || err);
        throw err;
    }
};
