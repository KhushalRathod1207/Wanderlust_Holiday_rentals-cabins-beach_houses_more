import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Components / Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ListingIndex from "./pages/listings/ListingIndex";
import ListingEdit from "./pages/listings/ListingEdit";
import NewListing from "./pages/listings/NewListing";
import ShowListing from "./pages/listings/ShowListing";
import Login from "./pages/users/Login";
import Signup from "./pages/users/Signup";
import ProfilePage from "./pages/profile/ProfilePage";
import Category from "./components/Category";
import SearchResults from "./components/SearchResults";
import ChatBot from "./components/ChatBot";
import Error from "./components/Error";
import { getCurrentUser } from "./api";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrUser(user || null);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        setCurrUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  if (loadingUser) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Router>
      <div className="app-container"> {/* <-- new flex wrapper */}
        <Navbar currUser={currUser} setCurrUser={setCurrUser} />
        <div className="main-content"> {/* <-- grows to push footer */}
          <Routes>
            <Route path="/" element={<ListingIndex />} />
            <Route path="/listings" element={<ListingIndex />} />
            <Route path="/listings/:id" element={<ShowListing currUser={currUser} />} />
            <Route path="/login" element={<Login setCurrUser={setCurrUser} />} />
            <Route path="/signup" element={<Signup setCurrUser={setCurrUser} />} />
            <Route path="/categories/:category" element={<Category />} />
            <Route path="/search" element={<SearchResults />} />

            {/* Protected Routes */}
            <Route
              path="/listings/new"
              element={
                <ProtectedRoute currUser={currUser}>
                  <NewListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listings/:id/edit"
              element={
                <ProtectedRoute currUser={currUser}>
                  <ListingEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute currUser={currUser}>
                  <ProfilePage currUser={currUser} />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Error message="Page Not Found" />} />
          </Routes>
        </div>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}


export default App;
