import { NavLink } from "react-router-dom";

const SettingsLinks = () => {
  return (
    <>
      <div>
        <div className="ui__menu">
          <div className="ui__menu--header">
            <p>Settings</p>
            <hr style={{ width: "15rem" }} />
          </div>
          <ul className="ui">
            <NavLink to="/settings/myaccount">Account</NavLink>
            <NavLink to="/settings/2fa">MFA</NavLink>
            <NavLink to="/settings/irreversible-action">Danger</NavLink>
            <NavLink to="/settings/export-data">Export</NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SettingsLinks;
