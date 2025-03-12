import ReactModal from "react-modal";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ConfirmPasswordModal } from "../../../Modals";
import { useNavigate } from "react-router-dom";

ReactModal.setAppElement("#root");
const IrreversibleStuff = () => {
  const navigate = useNavigate();

  const [modalVaultDelete, setModalVaultDelete] = useState(false);
  const [modalAccountDelete, setModalAccountDelete] = useState(false);

  // vault Modal states:
  const [vaultSuperPasswordVerified, setVaultSuperPasswordVerified] =
    useState(false);
  const [showVaultSuperPassModal, setShowVaultSuperPassModal] = useState(false);

  // Account Modal states:
  const [accountSuperPasswordVerified, setAccountSuperPasswordVerified] =
    useState(false);
  const [showAccountSuperPassModal, setShowAccountSuperPassModal] =
    useState(false);

  const vaultModalSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/delete-all-vault/`,
      {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      }
    );
    if (data.success === true) {
      toast.success(data.msg, {
        transition: Zoom,
      });
    } else {
      toast.info(data.msg, {
        transition: Slide,
      });
    }
    setModalVaultDelete(false);
  };
  const accountModalSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/delete-account/`,
      {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      }
    );
    if (data.success === true) {
      toast.success(data.msg, {
        transition: Zoom,
      });
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/delete-all-vault/`,
          {
            headers: {
              "Authorization": localStorage.getItem("token"),
            },
          }
        );
        if (data.success === true)
          toast.success(data.msg, {
            transition: Slide,
          });
        else
          toast.info(data.msg, {
            transition: Slide,
          });
      } catch (err) {
        toast.info("Error occured");
      }
      setTimeout(() => {
        navigate("/logout");
      }, 5000);
    } else {
      toast.info(data.msg, {
        transition: Slide,
      });
    }
    setModalAccountDelete(false);
  };

  const vaultProceedings = () => {
    if (vaultSuperPasswordVerified === false) setShowVaultSuperPassModal(true);
    setVaultSuperPasswordVerified(false);
  };

  const accountProceedings = () => {
    if (accountSuperPasswordVerified === false)
      setShowAccountSuperPassModal(true);
    setAccountSuperPasswordVerified(false);
  };

  return (
    <>
      <div className="ui-section" id="irreversible-stuff">
        <div className="ui-section__header">
          <h2>Irreversible Stuff</h2>
          <hr />
        </div>
      </div>
      <div>
        {vaultSuperPasswordVerified === false ? (
          <ConfirmPasswordModal
            showModal={showVaultSuperPassModal}
            setShowModal={setShowVaultSuperPassModal}
            setSuperPassVerified={setVaultSuperPasswordVerified}
            setNextModal={setModalVaultDelete}
          />
        ) : null}
        {accountSuperPasswordVerified === false ? (
          <ConfirmPasswordModal
            showModal={showAccountSuperPassModal}
            setShowModal={setShowAccountSuperPassModal}
            setSuperPassVerified={setAccountSuperPasswordVerified}
            setNextModal={setModalAccountDelete}
          />
        ) : null}
        {vaultSuperPasswordVerified && (
          <ReactModal
            isOpen={modalVaultDelete}
            onRequestClose={() => setModalVaultDelete(false)}
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
              <span
                onClick={() => setModalVaultDelete(false)}
                className="close"
              >
                <FaTimes />
              </span>
              <h3 className="modal__container--title">Caution!!</h3>
              <p className="modal__container--subtitle">
                This step deletes your vault data
              </p>
              <form
                onSubmit={vaultModalSubmit}
                className="modal__container--form"
              >
                <div className="modal__container--form-buttons">
                  <button type="submit" className="change__buttons">
                    Proceed
                  </button>
                  <button
                    onClick={() => setModalVaultDelete(false)}
                    className="cancel__buttons"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </ReactModal>
        )}
        {accountSuperPasswordVerified && (
          <ReactModal
            isOpen={modalAccountDelete}
            onRequestClose={() => setModalAccountDelete(false)}
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
              <span
                onClick={() => setModalAccountDelete(false)}
                className="close"
              >
                <FaTimes />
              </span>
              <h3 className="modal__container--title">Caution!!</h3>
              <p className="modal__container--subtitle">
                This step deletes your account related data
              </p>
              <form
                onSubmit={accountModalSubmit}
                className="modal__container--form"
              >
                <div className="modal__container--form-buttons">
                  <button type="submit" className="change__buttons">
                    Proceed
                  </button>
                  <button
                    onClick={() => setModalAccountDelete(false)}
                    className="cancel__buttons"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </ReactModal>
        )}
        <div className="ui-section__content--button settings--buttons__group">
          <button onClick={() => vaultProceedings()}>Delete Vault</button>
          <br />
          <button onClick={() => accountProceedings()}>Delete Account</button>
        </div>
        <ToastContainer hideProgressBar autoClose={3000} />
      </div>
    </>
  );
};

export default IrreversibleStuff;
