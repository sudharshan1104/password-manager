import ChangeMail from "./ChangeMail";
import ChangePassword from "./ChangePassword";

const MyAccount = () => {
  return (
    <>
      <div className="ui-section" id="myaccount">
        <ChangeMail />
        <br />
        <ChangePassword />
      </div>
    </>
  );
};

export default MyAccount;
