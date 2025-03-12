import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Utils/Reload.css";
import { useAuth } from "../../Context";

const Logout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const removeData = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    localStorage.removeItem("user");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("emailId");
    auth.logout();
  };

  useEffect(() => {
    removeData();
    setTimeout(() => {
      navigate("/Login");
    }, 800);
    //eslint-disable-next-line
  }, []);

  return (
    <center>
      <div className="loader"></div>
      <h1>Loading..</h1>
    </center>
  );
};

export default Logout;
