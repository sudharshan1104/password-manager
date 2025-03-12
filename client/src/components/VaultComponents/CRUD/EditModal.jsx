import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/Utils/EditModalStyle.css";

ReactModal.setAppElement("#root");
const EditModal = ({ siteModal, setModal, modal, sites, setSites, close }) => {
  const [siteUrl, setsiteUrl] = useState(siteModal.siteUrl);
  const [uname, setUname] = useState(siteModal.uname);
  const [password, setPassword] = useState(siteModal.password);
  const [eye, setEye] = useState(true);

  const config = {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  };

  const modalSubmit = async (e) => {
    e.preventDefault();
    setModal(false);

    setSites(
      sites.map((val) => {
        return val._id === siteModal._id
          ? {
              _id: val._id,
              siteUrl: siteUrl,
              uname: uname,
              password: password,
            }
          : val;
      })
    );

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/vault-encrypt-password`,
        { siteObj: { password: password, _id: siteModal._id } },
        config
      );
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/record-edit/${siteModal._id}`,
        { siteUrl, uname, password: data },
        config
      );
      toast.success("Edited Successfully", {
        autoClose: 1000,
        transition: Flip,
      });
    } catch (error) {
      console.log(error);
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
      <ReactModal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
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
          <span onClick={() => setModal(false)} className="close">
            <FaTimes />
          </span>
          <h3 className="modal__container--title">Edit</h3>
          <form onSubmit={modalSubmit} className="modal__container--form">
            <label>Site Name:</label>
            <input
              type="text"
              value={siteUrl}
              onChange={(e) => setsiteUrl(e.target.value)}
            />
            <label>User Name:</label>
            <input
              type="text"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
            />
            <label>New Password:</label>
            <div className="pass">
              <input
                type="password"
                id="pswd"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye" onClick={() => togglePassword()}>
                {eye === true ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="modal__container--form-buttons">
              <button type="submit" className="change__buttons">
                Change
              </button>
              <button
                onClick={() => setModal(false)}
                className="cancel__buttons"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </ReactModal>
    </>
  );
};

export default EditModal;
