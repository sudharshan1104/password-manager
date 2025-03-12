import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Zoom, Flip, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/user/only-password`,
      { password: currentPassword },
      config
    );
    if (data.success === false) {
      toast.error("Incorrect Password!", {
        autoClose: 2000,
        transition: Flip,
      });
    } else {
      if (newPassword.length < 6) {
        toast.info("New Password is too short!!", {
          autoClose: 3000,
          transition: Slide,
        });
      } else if (newPassword !== repeatPassword) {
        toast.info("Passwords Not Matched!", {
          autoClose: 2500,
          transition: Zoom,
        });
        setNewPassword("");
        setRepeatPassword("");
      } else {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/api/user/reset-password-settings`,
          { password: newPassword },
          config
        );
        if (data.success === true) {
          toast.success("Password Updated!", {
            autoClose: 2500,
            transition: Flip,
          });
          setCurrentPassword("");
          setNewPassword("");
          setRepeatPassword("");
          setTimeout(() => {
            navigate("/logout");
          }, 2500);
        } else {
          toast.error("Password Not Updated!", {
            autoClose: 2500,
            transition: Zoom,
          });
        }
      }
    }
  };
  return (
    <>
      <div className="ui-section__header">
        <h2>Change Password</h2>
        <hr />
      </div>
      <div className="ui-section__content">
        <form>
          <label>Master Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          ></input>
          <br />
          <label>New Master Password:</label>
          <input
            type="password"
            value={newPassword}
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          <label>Confirm Master Password:</label>
          <input
            type="password"
            value={repeatPassword}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onChange={(e) => setRepeatPassword(e.target.value)}
          ></input>
          <div className="ui-section__content--button">
            <button onClick={submitForm}>Save</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
