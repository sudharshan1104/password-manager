import { HomeNavbar } from "../../components/HomeComponents";
import { useNavigate } from "react-router-dom";
import pic from "../../images/under_construction";

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <>
      <HomeNavbar />
      <div className="info__page">
        <img src={pic} className="info__page--pic" alt="MailBox" />
        <p className="info__page--message">Page Not Found</p>
        <button
          onClick={() => navigate(-1)}
          className="info__page--proceed-button"
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default UnderConstruction;
