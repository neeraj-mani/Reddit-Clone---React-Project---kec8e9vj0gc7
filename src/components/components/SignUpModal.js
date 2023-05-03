import React, { useEffect, useState } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function SignUpModal() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [err, setErr] = useState("");

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigate = () => {
    handleClose();
    navigate("/");
  };

  const handleSubmit = (e) => {
    //TODO : handle submit
    if (name && email && password) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
          await setDoc(doc(db, "users", email), {
            name,
          });
          setIsLoading(false);
          toast.success("Signed Up Successfully!");
          navigate("/signin");
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          setErr(error.code);
          toast.error(error.customData["_tokenResponse"].error.message);
          setIsLoading(false);
        });
    } else {
      toast.error("Please fill input fields!");
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* <Button onClick={handleOpen} variant="contained">
        SignUp
      </Button> */}
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
            Sign Up
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            type={"text"}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
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
            value={password}
            type={"password"}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" id="btnSignUp" onClick={handleSubmit}>
            {isLoading ? (
              <CircularProgress size={"1.7rem"} sx={{ color: "#fff" }} />
            ) : (
              "SignUp"
            )}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
