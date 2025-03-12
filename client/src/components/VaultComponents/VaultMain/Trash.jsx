import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { Record } from "../CRUD";
import { ConfirmDeletionModal, ConfirmRestoreModal } from "../../../Modals";

ReactModal.setAppElement("#root");
const Trash = () => {
  const [sites, setSites] = useState([]);
  const [delModal, setDelModal] = useState(false);
  const [restoreModal, setRestoreModal] = useState(false);
  const [siteModal, setSiteModal] = useState([]);

  useEffect(() => {
    const fetchSites = async () => {
      const sitesArr = [];
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/vault-data/`,
        {
          headers: {
            "Authorization": localStorage.getItem("token"),
          },
        }
      );
      for (let i = 0; i < data.sites.length; i++) {
        if (data.sites[i].deleted === true) {
          sitesArr.push(data.sites[i]);
        }
      }
      setSites(sitesArr);
    };
    fetchSites();
  }, []);

  return (
    <>
      <div className="ui-section">
        <div className="ui-section__header">
          <h2>Trash</h2>
          <hr />
          <div className="none">
            <p id="message" style={{ display: "inline" }}>
              The Items here are automatically deleted after 7 days
            </p>
          </div>
          <br />
        </div>
        {sites.length > 0 && (
          <>
            <main className="vault">
              {sites.map((site) => (
                <Record
                  site={site}
                  sites={sites}
                  setSites={setSites}
                  setModal={setDelModal}
                  key={site._id}
                  setSiteModal={setSiteModal}
                  star={false}
                  setDelModal={setDelModal}
                  setRestoreModal={setRestoreModal}
                />
              ))}
            </main>
          </>
        )}
        {delModal && (
          <ConfirmDeletionModal
            siteModal={siteModal}
            modal={delModal}
            sites={sites}
            setModal={setDelModal}
            setSites={setSites}
            close={() => setDelModal(false)}
          />
        )}
        {restoreModal && (
          <ConfirmRestoreModal
            siteModal={siteModal}
            modal={restoreModal}
            sites={sites}
            setModal={setRestoreModal}
            setSites={setSites}
            close={() => setRestoreModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default Trash;
