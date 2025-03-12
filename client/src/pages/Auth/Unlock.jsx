import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Forms/Forms.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HomeNavbar } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context";

const Unlock = () => {
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();

  setEmailId(localStorage.getItem("emailId"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
        { emailId, password }
      );
      if (data.success === true) {
        localStorage.setItem("user", data.superUser);
        localStorage.setItem("isLoggedIn", data.success);
        localStorage.setItem("emailId", emailId);
        auth.login(data.superUser);

        toast.success("Success!!", {
          autoClose: 200,
          transition: Flip,
        });
        navigate("/vault/all-items", { replace: true });
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
          <h1 className="form__heading">Unlock</h1>
          <hr />
          <form onSubmit={() => handleSubmit}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              id="pswd"
              required
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye" onClick={() => togglePassword()}>
              {eye === true ? <FaEye /> : <FaEyeSlash />}
            </span>
            <p className="form__container--instructions">
              Logged in as {localStorage.getItem("emailId")}
            </p>
            <div className="form__submit">
              <button type="submit" className="submit-button">
                Log In
              </button>
            </div>
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

export default Unlock;
