import React, { useState } from "react";
import { HomeNavbar } from "../../components";
import axios from "axios";
import pic from "../../images/purple-mail.svg";
import "../../styles/InfoPage/InfoPage.css";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/reset-password-email`,
        {
          emailId,
        }
      );
      setFormSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HomeNavbar />
      {!formSubmitted && (
        <section className="form__container">
          <div className="form__wrapper login">
            <h1 className="form__heading">Forgot Password</h1>
            <hr />
            <p>Enter the registed email to send the password link.</p>
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
              <div className="form__submit">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      {formSubmitted && (
        <div className="info__page">
          <img src={pic} className="info__page--pic" alt="MailBox" />
          <p className="info__page--message">
            Please close this tab and check your email:<u> {emailId} </u>
          </p>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
