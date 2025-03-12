import { VaultNavbar } from "../../../components/";
import { VaultLinks, AllVault } from "../../../components/";
import "../../../styles/Vault/UI.css";

const VskAllItems = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <VaultLinks />
        <section className="ui-section__container">
          <AllVault />
        </section>
      </section>
    </>
  );
};

export default VskAllItems;
