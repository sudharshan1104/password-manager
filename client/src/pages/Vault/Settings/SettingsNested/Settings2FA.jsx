import {
  VaultNavbar,
  TwoStepLogin,
  SettingsLinks,
} from "../../../../components/";
import "../../../../styles/Vault/UI.css";

const Settings2Fa = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="ui-section__container">
          <TwoStepLogin />
        </section>
      </section>
    </>
  );
};

export default Settings2Fa;
