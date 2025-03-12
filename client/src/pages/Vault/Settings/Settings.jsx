import { VaultNavbar, SettingsLinks } from "../../../components";
import "../../../styles/Vault/UI.css";

const Settings = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
      </section>
    </>
  );
};

export default Settings;
