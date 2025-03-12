import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../../../styles/Vault/Record.css";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVerticalOutline, IoClipboardOutline } from "react-icons/io5";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit, MdOutlineRestorePage } from "react-icons/md";

import React from "react";
import { useRef } from "react";

const Record = ({
  site,
  sites,
  setSites,
  setModal,
  setSiteModal,
  star,
  setDelModal,
  setRestoreModal,
}) => {
  // const [status, setStatus] = useState(1); // hidden-1, show-0
  const [menu, setMenu] = useState(false);
  const [fav, setFav] = useState(site.favorite);
  const menuRef = useRef();
  const menuIconsRef = useRef();

  const config = {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  };

  const toggleStar = async () => {
    if (fav === true) {
      setFav(false);
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/record-edit/${site._id}`,
        {
          favorite: false,
        },
        config
      );
    } else {
      setFav(true);
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/record-edit/${site._id}`,
        {
          favorite: true,
        },
        config
      );
    }
  };

  // utility for closing/hiding the menu
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setMenu(false);
    }
  }, []);

  const toggleMenu = () => {
    if (menu === true) setMenu(false);
    else setMenu(true);
  };
  const outFunction = useCallback((event) => {
    if (
      !menuRef.current?.contains(event.target) &&
      !menuIconsRef.current?.contains(event.target)
    )
      setMenu(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    document.addEventListener("mousedown", outFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
      document.removeEventListener("mousedown", outFunction);
    };
  }, [escFunction, outFunction]);

  useEffect(() => {
    const decryptPassword = async (siteObj) => {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/vault-decrypt-password/`,
        { siteObj: { password: site.password } },
        {
          headers: {
            "Authorization": localStorage.getItem("token"),
          },
        }
      );
      siteObj.password = res.data;
      setSites(
        sites.map((site) => {
          return site._id === siteObj._id
            ? {
                _id: site._id,
                siteUrl: site.siteUrl,
                uname: site.uname,
                password: res.data,
              }
            : site;
        })
      );
    };
    decryptPassword(site);
    // eslint-disable-next-line
  }, []);

  const copyField = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      toast.success("Saved to Clip-Board", {
        autoClose: 1000,
        transition: Bounce,
        position: "bottom-center",
        hideProgressBar: true,
      });
      setMenu(false);
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };

  const removeRecord = async (siteId) => {
    try {
      toast.warn("Item Moved to trash!", {
        autoClose: 1500,
        hideProgressBar: true,
        transition: Slide,
      });
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/record-delete/${siteId}`,
        config
      );
      setSites(
        sites.filter((val) => {
          return val._id !== siteId;
        })
      );
    } catch (err) {
      console.log(err);
    }
    setMenu(false);
  };

  const editStuff = (site) => {
    setModal(true);
    setSiteModal(site);
    setMenu(false);
  };

  const restore = (site) => {
    setRestoreModal(true);
    setSiteModal(site);
    setMenu(false);
  };

  const permenantDelete = (site) => {
    setDelModal(true);
    setSiteModal(site);
  };

  return (
    <>
      <section className="vault__contents">
        <span className="vault__contents--menu" ref={menuIconsRef}>
          {star && (
            <span onClick={() => toggleStar()}>
              {fav === true ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          )}
          {<IoEllipsisVerticalOutline onClick={() => toggleMenu()} />}
        </span>
        <div className="menu__links">
          <div className={`menu__dropdown-${menu}`}>
            {menu && (
              <div className="vault__contents--edit-icons" ref={menuRef}>
                {star && (
                  <>
                    <div>
                      <span
                        onClick={() => removeRecord(site._id)}
                        className="trash"
                      >
                        <FaTrash />
                        Remove
                      </span>
                    </div>
                    <div>
                      <span onClick={() => editStuff(site)} className="edit">
                        <MdEdit />
                        Edit
                      </span>
                    </div>
                    <div>
                      <span onClick={() => copyField(site.uname)}>
                        <IoClipboardOutline />
                        UserName
                      </span>
                    </div>
                    <div>
                      <span onClick={() => copyField(site.password)}>
                        <IoClipboardOutline />
                        Password
                      </span>
                    </div>
                  </>
                )}
                {!star && (
                  <>
                    <div>
                      <span onClick={() => restore(site)} className="restore">
                        <MdOutlineRestorePage />
                        Restore
                      </span>
                    </div>
                    <div>
                      <span
                        onClick={() => permenantDelete(site)}
                        className="restore"
                      >
                        <FaTrash />
                        Delete
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="record__container">
          <div>
            <img
              className="record__favicon"
              src={`${import.meta.env.VITE_FAVICON_URL}/${site.siteUrl}/`}
              alt="No Favicon"
            />
          </div>
          <div>
            <p className="record__title" onClick={() => editStuff(site)}>
              <b>{site.siteUrl}</b>
            </p>
            <p>{site.uname}</p>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Record;
