import { useEffect, useState } from "react";
import "./src/styles/InfoPage/ConnectionStatus.css";
import { FaCheckCircle, FaInfo } from "react-icons/fa";
import axios from "axios";

const ConnectionStatus = () => {
  const [status, setStatus] = useState();
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getStatus = async () => {
      try {
        const resp = await axios.get(import.meta.env.VITE_SERVER_URL);
        if (isMounted) {
          setStatus(resp.status);
          setShowComponent(true);
          setTimeout(() => {
            setShowComponent(false); // Hide the custom component after 5 seconds (adjust as needed).
          }, 1500);
        }
      } catch (err) {
        setTimeout(getStatus, 1000);
      }
    };
    getStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {status !== 200 && (
        <div className="container" id="fail">
          <FaInfo />
          Connecting to Server ...
        </div>
      )}
      {showComponent && status === 200 && (
        <div className="container" id="success">
          <FaCheckCircle />
          Connected to our Servers
        </div>
      )}
    </>
  );
};

export default ConnectionStatus;
