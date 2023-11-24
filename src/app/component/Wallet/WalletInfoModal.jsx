import React, { useEffect, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import SingleWallet from "./SingleWallet";
import "./Wallets.scss";

function WalletInfoModal(props) {
  const [isShowInfo, setShowInfo] = useState(false);
  const { isConnected } = useAccount();
  let navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      if (
        localStorage.getItem(process.env.REACT_APP_WAGMI_CONNECTED) &&
        localStorage.getItem(process.env.REACT_APP_IS_SHOW_WALLETS)
      ) {
        navigate("/activate-account");
        localStorage.removeItem(process.env.REACT_APP_IS_SHOW_WALLETS);
      }
    }
  }, [isConnected]);

  return (
    <>
      <div className="wallet_block">
        <CloseCircleOutlined
          className="exit"
          onClick={() => {
            props.setWalletModal(false);
          }}
        />
        <h4>
          <b>THANK YOU FOR YOUR PAYMENT</b>
        </h4>
        <h4 className="red">
          <b>DO NOT SKIP THIS STEP</b>
        </h4>
        <p>
          To create your membership you MUST now connect a wallet or create
          a wallet. Don’t worry it’s super simple and it is going to open a
          whole world of new possibilities for you!
        </p>
        <div className="row cnnct-wlt">
          <div className="col-md-8 col-12">
            <div className="wallet_detail">
              <button
                className="get_wallet"
                onClick={() => {
                  setShowInfo(isShowInfo ? false : true);
                }}
              >
                {isShowInfo ? "CONNECT WALLET" : "GET WALLET"}
              </button>
              <h5>WHAT IS A WEB 3 WALLET & WHY DO I NEED ONE ?</h5>
              <p>
                A Web 3 Wallet, Simply Put is your way to connect to a
                highly secure internet where you hold and control your own
                data.
              </p>
              <p>
                The Secure Way To Log In instead of creating new accounts
                and passwords on every website, Just connect your wallet.
              </p>
              <p>
                A Home for your Digital Assets. Wallets are used to send,
                receive, store, and display your digital assets like Bitcoin
                and NFTs.
              </p>
            </div>
          </div>
          <div className="col-md-3 col-12 offset-md-1 wallet-option">
            <div className="connect_wallet">
              <h6 className="m-1">
                {isShowInfo ? "GET WALLET" : "CONNECT WALLET"}
              </h6>
              <SingleWallet
                isShowInfo={isShowInfo}
                setWalletModal={props.setWalletModal}
                stripeHandleClose={props.stripeHandleClose}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WalletInfoModal;
