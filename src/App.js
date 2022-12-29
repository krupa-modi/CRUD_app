import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserDetails from "./pages/UserDetails";
import EditDetails from "./pages/EditDetails";
import ViewDetails from "./pages/ViewDetails";

function App() {
  return (
    <>
      {/* <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<HomePage />} />
        <Route path="/users" element={<UserDetails />} />
        <Route path="/users/EditDetails/:id" element={<EditDetails />} />
        <Route path="/users/ViewDetails/:id" element={<ViewDetails />} />
      </Routes>
    </>
  );
}

export default App;
