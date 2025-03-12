import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Forms/Forms.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HomeNavbar } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import { Zoom, Flip, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context";

const LoginForm = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);
  const [autoF, setAutoF] = useState("emailId");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (localStorage.getItem("emailId")) {
      setEmailId(localStorage.getItem("emailId"));
      setAutoF("password");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
        { emailId, password }
      );
      // TOTP Enabled
      if (data.success === "partial" && data.totpStatus === true) {
        if (localStorage.getItem("isLoggedIn") === "true") {
          auth.login(data.superUser);
          navigate("/vault/all-items", { replace: true });
        } else {
          localStorage.setItem("user", data.superUser);
          navigate("/login-totp", { replace: true });
        }
      }
      // TOTP Disabled
      else if (data.success === true && data.totpStatus === false) {
        localStorage.setItem("user", data.superUser);
        localStorage.setItem("isLoggedIn", data.success);
        localStorage.setItem("emailId", emailId);
        localStorage.setItem("token", data.token);
        auth.login(data.superUser);

        toast.success("Success!!", {
          autoClose: 200,
          transition: Flip,
        });
        navigate("/vault/all-items", { replace: true });
      } else if (data.success === false && data.msg === "could not find user") {
        toast.info("User not Found", {
          autoClose: 3000,
          transition: Zoom,
        });
        navigate("/signup");
      } else if (
        data.success === false &&
        data.msg === "you entered the wrong password"
      ) {
        toast.warn("Password is incorrect", {
          autoClose: 3000,
          transition: Slide,
        });
      } else {
        toast.error(data.msg);
        setTimeout(() => {
          navigate("/signup");
        }, 1500);
      }
    } catch (err) {
      toast.error("User Not Found!", {
        autoClose: 3000,
        transition: Flip,
      });
      setTimeout(() => {
        navigate("/signup");
      }, 3000);
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

  return (
    <>
      <HomeNavbar />
      <section className="form__container">
        <div className="form__wrapper login">
          <h1 className="form__heading">Sign In</h1>
          <p className="form__container--instructions">
            Enter details to login or unlock vault
          </p>
          <hr />
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={emailId}
              required
              autoFocus
              placeholder="Enter Email"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <label>Password:</label>
            {autoF === "password" && (
              <input
                type="password"
                value={password}
                id="pswd"
                autoFocus
                required
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
            {autoF === "emailId" && (
              <input
                type="password"
                value={password}
                id="pswd"
                required
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
            <span className="eye" onClick={() => togglePassword()}>
              {eye === true ? <FaEye /> : <FaEyeSlash />}
            </span>
            <div className="form__submit">
              <button type="submit" className="submit-button">
                Log In
              </button>
            </div>
            {/* {message && <div className="response">{message}</div>} */}
          </form>
          <div className="dialogs">
            <p>
              <Link to="/forgot-password">Forgot Password??</Link>
            </p>
            <p>
              <Link to="/signup">New here, Register</Link>
            </p>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
