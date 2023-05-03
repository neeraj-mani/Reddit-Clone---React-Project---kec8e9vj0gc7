import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { GrClose } from "react-icons/gr";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth, db } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authStatus } from "../redux/authSlice";
import { doc, getDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function SignInModal() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  const handleNavigate = () => {
    handleClose();
    navigate("/");
  };

  const handleSubmit = (e) => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          toast.success(`Signed in successfully`);
          const docRef = doc(db, "users", email);
          localStorage.setItem("name", (await getDoc(docRef)).data().name);
          localStorage.setItem("email", email);
          localStorage.setItem(
            "upVotedArr",
            (await getDoc(docRef, email)).data().upVotedArr || ""
          );
          localStorage.setItem(
            "downVotedArr",
            (await getDoc(docRef, email)).data().downVotedArr || ""
          );
          setEmail("");
          setPassword("");
          handleClose();
          localStorage.setItem("isUserLoggedIn", true);

          dispatch(authStatus(true));

          setTimeout(() => {
            navigate("/");
          }, 6000);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErr(errorMessage);
        });
    } else {
      toast.error("Please fill input fields!");
    }
  };

  const goToSignUp = () => {
    handleClose();
    navigate("/signup");
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="form-style" sx={style}>
          {err && <em id="err-style">{err}</em>}
          <GrClose id="close-icon" onClick={handleNavigate} />
          <IoMdLock id="lock" />
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Sign In
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            type={"email"}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={"password"}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" id="btnSignIn" onClick={handleSubmit}>
            SignIn
          </Button>

          <Typography style={{ textAlign: "end" }}>
            New user ?{" "}
            <Button size="medium" variant="elevated" onClick={goToSignUp}>
              SignUp
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
