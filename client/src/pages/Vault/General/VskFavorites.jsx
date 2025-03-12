import { VaultNavbar } from "../../../components";
import { VaultLinks, Favorites } from "../../../components";
import "../../../styles/Vault/UI.css";

const VskFavorites = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <VaultLinks />
        <section className="ui-section__container">
          <Favorites />
        </section>
      </section>
    </>
  );
};

export default VskFavorites;
