import React from "react";
import Button from "@mui/material/Button";
import { handleLogin } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import "../styles/Login.css";
const Login = () => {
  const dispatch = useDispatch();
  let usuario = {
    nombre: "",
    apellido: "",
    role: "",
    estado: "inactivo",
  };
  const handleSignIn = async () => {
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          handleLogin({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        usuario = {
          nombre: user.displayName.split(" ")[0],
          apellido: user.displayName.split(" ")[1],
          role: "user",
          estado: "inactivo",
        };
      })
      .then(() => {
        axios.post("http://localhost:8080/usuarios", usuario).then((res) => {
          console.log(res);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <Button
        size="large"
        variant="contained"
        color="error"
        startIcon={<GoogleIcon />}
        onClick={() => handleSignIn()}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default Login;
