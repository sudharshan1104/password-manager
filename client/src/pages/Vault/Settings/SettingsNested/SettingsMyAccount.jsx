import { VaultNavbar, SettingsLinks } from "../../../../components";
import MyAccount from "../../../../components/VaultComponents/Settings/AccountRelated/MyAccount";
import "../../../../styles/Vault/UI.css";

const SettingsMyAccount = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="ui-section__container">
          <MyAccount />
        </section>
      </section>
    </>
  );
};

export default SettingsMyAccount;
