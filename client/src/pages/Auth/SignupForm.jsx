import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Forms/Forms.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HomeNavbar } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import { Zoom, Flip, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [emailId, setEmailId] = useState("");
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");
  const [eye, setEye] = useState(true);
  const [ceye, setcEye] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== againPassword) {
      toast.warn("Passwords Not matched!!", {
        transition: Flip,
      });

      setPassword("");
      setAgainPassword("");
    } else {
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/user/register`,
          {
            emailId,
            password,
            uname,
            againPassword,
          }
        );
        navigate("/login");
      } catch (err) {
        const errObj = err.response.data.errors;
        console.log(err.response.data.errors);
        if (errObj.emailId !== "")
          toast.warn(errObj.emailId, {
            transition: Zoom,
          });
        else if (errObj.uname !== "")
          toast.warn(errObj.uname, {
            transition: Slide,
          });
        else toast.warn(errObj.password);
      }
    }
  };

  const togglePassword = () => {
    const pswd = document.getElementById("pswd");
    if (eye === true && pswd.type === "password") {
      setEye(false);
      pswd.type = "text";
    } else {
      pswd.type = "password";
      setEye(true);
    }
  };

  const togglecPassword = () => {
    const cpswd = document.getElementById("cpswd");
    if (eye === true && cpswd.type === "password") {
      setcEye(false);
      cpswd.type = "text";
    } else {
      cpswd.type = "password";
      setcEye(true);
    }
  };

  return (
    <>
      <HomeNavbar />
      <section className="form__container">
        <div className="form__wrapper register">
          <h1 className="form__heading">Register</h1>
          <p className="form__container--instructions">
            Enter details , choose a strong password!
          </p>
          <hr />
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={emailId}
              required
              autoFocus
              placeholder="Enter Valid Email ID"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <label>User Name:</label>
            <input
              type="text"
              value={uname}
              required
              placeholder="Enter User Name"
              onChange={(e) => setUname(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              required
              id="pswd"
              placeholder="Set a Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye" onClick={() => togglePassword()}>
              {eye === true ? <FaEye /> : <FaEyeSlash />}
            </span>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={againPassword}
              required
              id="cpswd"
              placeholder="Confirm Password"
              onChange={(e) => setAgainPassword(e.target.value)}
            />
            <span className="eye" onClick={() => togglecPassword()}>
              {ceye === true ? <FaEye /> : <FaEyeSlash />}
            </span>
            <div className="form__submit">
              <button type="submit" className="submit-button">
                Register
              </button>
            </div>
          </form>
          <div className="dialogs">
            <p>
              Existing User? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};

export default SignupForm;
