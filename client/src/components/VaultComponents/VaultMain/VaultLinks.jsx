import { NavLink } from "react-router-dom";

const VaultLinks = () => {
  return (
    <>
      <div>
        <div className="ui__menu">
          <div className="ui__menu--header">
            <p>MENU:</p>
          </div>
          <ul className="ui">
            {/* <NavLink to="/vault/all-items">My Vault</NavLink> */}
            {/* <NavLink to="/vault/new">+Organization</NavLink> */}
            <div className="ui__menu--header">
              <p>Vault</p>
              <hr style={{ width: "15rem" }} />
            </div>
            <NavLink to="/vault/all-items">All-Items</NavLink>
            <NavLink to="/vault/fav">Favourites</NavLink>
            <NavLink to="/vault/trash">Trash</NavLink>
            <div className="ui__menu--header">
              <p>Tools</p>
              <hr style={{ width: "15rem" }} />
            </div>
            <NavLink to="/password-generator">Password Generator</NavLink>
            {/* Types */}
            {/* <NavLink to="/vault/login">Login</NavLink>
            <NavLink to="/vault/card">Card</NavLink>
            <NavLink to="/vault/identity">Identity</NavLink> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default VaultLinks;
