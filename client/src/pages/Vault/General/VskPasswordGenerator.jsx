import { VaultNavbar } from "../../../components/";
import { VaultLinks } from "../../../components/";
import Generator from "../../../pages/PasswordGenerator/Generator";
import "../../../styles/Vault/UI.css";

const VskPasswordGenerator = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        <VaultLinks />
        <section>
          <Generator />
        </section>
      </section>
    </>
  );
};

export default VskPasswordGenerator;
