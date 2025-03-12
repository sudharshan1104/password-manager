import { useState } from "react";
import axios from "axios";
import "../../styles/Forms/Forms.css";
import { HomeNavbar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context";

const Totp = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const config = {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/totp-status-noauth`,
        { superUser: localStorage.getItem("user") }
      );
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/totp-verification-noauth`,
        {
          secret_32: data.base32,
          code: code,
          user: localStorage.getItem("user"),
        },
        config
      );
      if (response.data.success === true) {
        auth.login(response.data.superUser);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("emailId", response.data.emailId);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expires", response.data.expiresIn);
        navigate("/vault/all-items", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HomeNavbar />
      <section className="form__container">
        <div className="form__wrapper-totp">
          <h1 className="form__heading">Second Step</h1>
          <hr />
          <p className="totp__instructions">
            Enter the six Digit Pin on the authenticator app to proceed!
          </p>
          <form onSubmit={handleSubmit}>
            <label>Enter 6 digit pin:</label>
            <input
              type="number"
              value={code}
              max={999999}
              required
              placeholder="Enter 6 digit Code"
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="form__submit">
              <button type="submit" className="submit-button">
                Continue
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Totp;
