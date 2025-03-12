import ReactModal from "react-modal";
import { useState } from "react";
import axios from "axios";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

ReactModal.setAppElement("#root");
const ConfirmPasswordModal = ({
  setSuperPassVerified,
  showModal,
  setShowModal,
  setNextModal,
}) => {
  const [superPassword, setSuperPassword] = useState("");
  const [eye, setEye] = useState(true);

  const passModalSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/only-password`,
        { password: superPassword },
        {
          headers: {
            "Authorization": localStorage.getItem("token"),
          },
        }
      );
      if (data.success === true) {
        // if password is verified then
        setSuperPassVerified(true);
      } else setSuperPassVerified(false);
    } catch (err) {
      setSuperPassVerified(false);
      toast.error("Supper Password Incorrect", {
        transition: Zoom,
      });
    }
    setShowModal(false);
    setSuperPassword("");
    setNextModal(true);
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
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            position: "static",
            inset: "0px",
            border: "none",
            background: "none",
            visibility: "none",
          },
          overlay: { backgroundColor: "rgb(184 184 184 / 75%)" },
        }}
      >
        <section className="modal__container">
          <span onClick={() => setShowModal(false)} className="close">
            <FaTimes />
          </span>
          <h3 className="modal__container--title">Confirm Yourself:</h3>
          <form onSubmit={passModalSubmit} className="modal__container--form">
            <label>Enter MasterPassword:</label>
            <div>
              <input
                type="password"
                id="pswd"
                required
                autoFocus
                value={superPassword}
                onChange={(e) => setSuperPassword(e.target.value)}
              />
              <span className="eye" onClick={() => togglePassword()}>
                {eye === true ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="modal__container--form-buttons">
              <button className="change__buttons">Proceed</button>
              <button
                onClick={() => setShowModal(false)}
                className="cancel__buttons"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </ReactModal>
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

export default ConfirmPasswordModal;
