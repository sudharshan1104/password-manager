import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HomeNavbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/InfoPage/InfoPage.css";
import pic from "../../images/expired_link.svg";

const ResetPassword = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [linkValid, setLinkValid] = useState(true);
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const { token, emailId } = useParams();
  const [eye, setEye] = useState(true);
  const [ceye, setcEye] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isValidLink = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/user/reset-password-check-link/${token}`
      );
      setLinkValid(data.success);
    };
    isValidLink();
  }, [linkValid, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass.length < 6) toast.warn("Password is less than 6 characters");
    else if (pass !== cpass) toast.warn("Passwords doesn't match");
    else if (pass === cpass) {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/user/reset-password/${emailId}/${token}`,
        {
          password: pass,
          confirmPassword: cpass,
          token,
          emailId,
        }
      );
      if (data.success === true) {
        toast.success("Password Changed", {
          transition: Zoom,
        });
        setFormSubmitted(true);
      } else if (data.success === false && data.msg === "Token not verified") {
        setLinkValid(false);
      }
    } else {
      toast.info("Passwords Not matched", {
        transition: Slide,
      });
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
      {!formSubmitted && linkValid && (
        <section className="form__container">
          <div className="form__wrapper login">
            <h1 className="form__heading">Change Password</h1>
            <hr />
            <p>Reset your password</p>
            <form onSubmit={handleSubmit}>
              <label>New Password</label>
              <input
                type="password"
                value={pass}
                id="pswd"
                required
                autoFocus
                placeholder="Enter new password"
                onChange={(e) => setPass(e.target.value)}
              />
              <span className="eye" onClick={() => togglePassword()}>
                {eye === true ? <FaEye /> : <FaEyeSlash />}
              </span>
              <label>Confirm Password</label>
              <input
                type="password"
                value={cpass}
                id="cpswd"
                required
                placeholder="Enter new Password again"
                onChange={(e) => setCpass(e.target.value)}
              />
              <span className="eye" onClick={() => togglecPassword()}>
                {ceye === true ? <FaEye /> : <FaEyeSlash />}
              </span>
              <div className="form__submit">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      {formSubmitted && linkValid && (
        <div className="info__page">
          <img src={pic} className="info__page--pic" alt="MailBox" />
          <p className="info__page--message">Masterpassword is updated</p>
          <button
            onClick={() => navigate("/login")}
            className="info__page--proceed-button"
          >
            Login
          </button>
        </div>
      )}
      {!linkValid && (
        <div className="info__page">
          <img src={pic} className="info__page--pic" alt="MailBox" />
          <p className="info__page--message">Link is not Valid</p>
          <button
            onClick={() => navigate("/login")}
            className="info__page--proceed-button"
          >
            Login
          </button>
        </div>
      )}
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

export default ResetPassword;
