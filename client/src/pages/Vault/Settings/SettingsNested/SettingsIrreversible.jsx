import {
  VaultNavbar,
  IrreversibleStuff,
  SettingsLinks,
} from "../../../../components";
import "../../../../styles/Vault/UI.css";

const SettingsIrreversible = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="ui-section__container">
          <IrreversibleStuff />
        </section>
      </section>
    </>
  );
};

export default SettingsIrreversible;
