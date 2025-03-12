import { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Vault/HomeVault.css";
import { Record, EditModal } from "../CRUD";
import VaultNavbar from "./VaultNavbar";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const HomeVault = () => {
  const [uname, setUname] = useState("");
  const [sites, setSites] = useState([]);
  const [modal, setModal] = useState(false);
  const [siteModal, setSiteModal] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSites = async () => {
      const resp = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/vault-data/`,
        {
          headers: {
            "Authorization": localStorage.getItem("token"),
          },
        }
      );
      setSites(resp.data.sites);
      setUname(resp.data.user);
    };
    fetchSites();
  }, []);

  return (
    <>
      <section className="vault__dashboard">
        <VaultNavbar />
        <h1 id="message">Welcome 👋, {uname} </h1>
        {sites.length > 0 ? (
          <>
            <p id="ref">
              <u>Your Vault:</u>
              <span className="plus" onClick={() => navigate("/vault-create")}>
                <FaPlus />
              </span>
            </p>
            <main className="vault">
              {sites.map((site) => (
                <Record
                  site={site}
                  sites={sites}
                  setSites={setSites}
                  setModal={setModal}
                  key={site._id}
                  setSiteModal={setSiteModal}
                />
              ))}
            </main>
          </>
        ) : (
          <>
            {" "}
            <div className="none">
              <p id="message" style={{ display: "inline" }}>
                There is no data to display, Add now
              </p>
              <span
                className="plus-new"
                onClick={() => navigate("/vault-create")}
              >
                <FaPlus size={"1em"} />
              </span>
            </div>
          </>
        )}
      </section>
      {modal && (
        <EditModal
          siteModal={siteModal}
          modal={modal}
          sites={sites}
          setModal={setModal}
          setSites={setSites}
          close={() => setModal(false)}
        />
      )}
    </>
  );
};

export default HomeVault;
