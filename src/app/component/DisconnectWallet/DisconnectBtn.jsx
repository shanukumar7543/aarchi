import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { WarningFilled } from "@ant-design/icons";
import "@rainbow-me/rainbowkit/styles.css";
import { useDisconnect } from "wagmi";
import "./DisconnectWallet.scss";

function Disconnect() {
  const [isShowDisconnectModal, setDisconnectModal] = useState();
  const { disconnect } = useDisconnect();

  const removeLocalStorage = () => {
    disconnect();
    let theme = localStorage.getItem(process.env.REACT_APP_THEME);

    localStorage.removeItem("inputAmount");
    localStorage.setItem(process.env.REACT_APP_THEME, theme);
    setDisconnectModal(false);
    window.location.href = "/";
  };

  return (
    <>
      <button
        className="btn disconnect_button"
        onClick={() => setDisconnectModal(true)}
      >
        DISCONNECT WALLET
      </button>
      <Modal show={isShowDisconnectModal} className="custom-date-modal">
        <Modal.Header closeButton onClick={() => setDisconnectModal(false)}>
          <Modal.Title>Confirmation!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bd">
          <div>
            <WarningFilled className="warnnig-icon" />
            <p className="warn-txt">Are you sure?</p>
            <p className="warn-txt">Do you want to disconnect wallet?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDisconnectModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              removeLocalStorage();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Disconnect;
