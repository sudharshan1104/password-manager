import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { Record, EditModal } from "../CRUD";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

ReactModal.setAppElement("#root");
const AllVault = () => {
  const [sites, setSites] = useState([]);
  const [modal, setModal] = useState(false);
  const [siteModal, setSiteModal] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSites = async () => {
      const sitesArr = [];
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/vault-data`,
        {
          headers: {
            "Authorization": localStorage.getItem("token"),
          },
        }
      );
      for (let i = 0; i < data.sites.length; i++) {
        if (data.sites[i].deleted === false) {
          sitesArr.push(data.sites[i]);
        }
      }
      setSites(sitesArr);
    };
    fetchSites();
  }, []);

  return (
    <>
      <div className="ui-section" id="two-step-login">
        <div className="ui-section__header">
          {sites.length > 0 && (
            <span className="plus" onClick={() => navigate("/vault-create")}>
              <FaPlus />
            </span>
          )}
          <h2>All Items</h2>
          <hr />
          <br />
        </div>
        {sites.length > 0 ? (
          <>
            <main className="vault">
              {sites.map((site) => (
                <Record
                  site={site}
                  sites={sites}
                  setSites={setSites}
                  setModal={setModal}
                  key={site._id}
                  setSiteModal={setSiteModal}
                  star={true}
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
      </div>
    </>
  );
};

export default AllVault;
