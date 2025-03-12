import ReactModal from "react-modal";
import { useState } from "react";
import axios from "axios";
import download from "js-file-download";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmPasswordModal } from "../../../Modals";

const ExportData = () => {
  const [modalExportData, setModalExportData] = useState(false);
  // Export Modal states:
  const [
    exportModalSuperPasswordVerified,
    setExportModalSuperPasswordVerified,
  ] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const exportModalSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/export-vault-data`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        const finalData = JSON.stringify(resp.data, null, 2);
        download(finalData, `${localStorage.getItem("user")}.json`);
      });
    toast.success("File is about to download", {
      transition: Slide,
    });
    setModalExportData(false);
  };
  const exportDataProceedings = () => {
    if (exportModalSuperPasswordVerified === false) setShowExportModal(true);
    setExportModalSuperPasswordVerified(false);
  };

  return (
    <>
      <div className="ui-section" id="irreversible-stuff">
        <div className="ui-section__header">
          <h2>Export Data</h2>
          <hr />
          <p>
            This step has to be performed with caution since the data export
            contains your password unprotected!!{" "}
          </p>
        </div>
        <div className="ui-section__content--button">
          <button onClick={exportDataProceedings}>Download File</button>
        </div>
        {exportModalSuperPasswordVerified === false ? (
          <ConfirmPasswordModal
            showModal={showExportModal}
            setShowModal={setShowExportModal}
            setSuperPassVerified={setExportModalSuperPasswordVerified}
            setNextModal={setModalExportData}
          />
        ) : null}
        {exportModalSuperPasswordVerified && (
          <ReactModal
            isOpen={modalExportData}
            onRequestClose={() => setModalExportData(false)}
            shouldCloseOnOverlayClick={true}
            style={{
              content: {
                position: "static",
                inset: "0px",
                border: "none",
                background: "none",
                visibility: "none",
              },
              overlay: { backgroundColor: "rgb(184 184 184 / 75%)" },
            }}
          >
            <section className="modal__container">
              <span onClick={() => setModalExportData(false)} className="close">
                <FaTimes />
              </span>
              <h3 className="modal__container--title">Caution!!</h3>
              <p className="modal__container--subtitle">
                Save it to secure place
              </p>
              <form
                onSubmit={exportModalSubmit}
                className="modal__container--form"
              >
                <div className="modal__container--form-buttons">
                  <button type="submit" className="change__buttons">
                    Proceed
                  </button>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="cancel__buttons"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </ReactModal>
        )}
        <ToastContainer hideProgressBar autoClose={3000} />
      </div>
    </>
  );
};

export default ExportData;
