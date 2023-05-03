import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import CreatePost from "./CreatePost";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authStatus } from "../redux/authSlice";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const getUserAuthUpdate = useSelector((state) => state.auth.userAuthStatus);
  const dispatch = useDispatch();

  const [showLogin, setshowLogin] = useState(getUserAuthUpdate);

  useEffect(() => {}, [showLogin]);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("upVotedArr");
        localStorage.removeItem("downVotedArr");
        dispatch(authStatus(false));
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  // console.log(typeof localStorage.getItem("isUserLoggedIn"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#f8f9fa" }}>
        <ToastContainer />
        <Toolbar>
          <CreatePost />
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            columnGap="2rem"
          >
            {localStorage.getItem("isUserLoggedIn") === "true" ? (
              <Button
                onClick={handleLogout}
                startIcon={<FaUser />}
                variant="outlined"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleLogin}
                  startIcon={<FaUser />}
                  variant="outlined"
                >
                  Login
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/signin" element={<SignInModal />} />
        <Route path="/signup" element={<SignUpModal />} />
      </Routes>
    </Box>
  );
}
