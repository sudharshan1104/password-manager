import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VaultNavbar from "../../../components/VaultComponents/VaultGeneral/VaultNavbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/Forms/Forms.css";

const CreateVault = () => {
  const [siteUrl, setsiteUrl] = useState("");
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();

  const config = {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/vault-create`,
        { siteUrl, uname, password },
        config
      );
      if (response.status === 200) {
        toast.success("Added!!", {
          autoClose: 1500,
          transition: Slide,
        });
        setTimeout(() => {
          navigate("/vault/all-items");
        }, 1500);
      } else {
        toast.warn("Invalid Operation", {
          autoClose: 3000,
          transition: Slide,
        });
      }
    } catch (err) {
      toast.error("Login to access", {
        autoClose: 3000,
        transition: Flip,
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

  return (
    <>
      <VaultNavbar />
      <section className="form__container">
        <div className="form__wrapper create-vault">
          <h1 className="form__heading">Add Site</h1>
          <form onSubmit={handleSubmit}>
            <label>Site Name:</label>
            <input
              type="text"
              value={siteUrl}
              required
              autoFocus
              placeholder="Enter site name or URL"
              onChange={(e) => setsiteUrl(e.target.value)}
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
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye" onClick={() => togglePassword()}>
              {eye === true ? <FaEye /> : <FaEyeSlash />}
            </span>
            <div className="form__submit">
              <button type="submit" className="submit-button">
                Create
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CreateVault;
