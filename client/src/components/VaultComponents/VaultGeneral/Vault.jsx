import VaultNavbar from "./VaultNavbar";
import "../../../styles/Vault/UI.css";
import { VaultLinks } from "../VaultMain/Components";

const Vault = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <VaultLinks />
      </section>
    </>
  );
};

export default Vault;
