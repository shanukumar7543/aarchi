import React from "react";
import { useConnect } from "wagmi";
import METAMASK from "../../../assets/images/metamask.svg";
import WALLETCONNECT from "../../../assets/images/social.svg";
import COINBASE from "../../../assets/images/coinbase.svg";

import "./Wallets.scss";

function WalletList(props) {
  const {
    connect,
    connectors,
    isConnected,
    error,
    isLoading,
    pendingConnector,
  } = useConnect();

  // const showWalletInfo = (walletIndex, flag) => {
  //   if (props.isShowInfo) {
  //     let url = "";
  //     switch (flag) {
  //       case "metamask":
  //         url = process.env.REACT_APP_METAMASK;
  //         break;
  //       case "walletconnect":
  //         url = process.env.REACT_APP_WALLETCONNECT;
  //         break;
  //       case "coinbase":
  //         url = process.env.REACT_APP_COINBASE;
  //         break;
  //     }
  //     window.open(url, "_blank");
  //   } else {
  //     connect({ connector: connectors[walletIndex] });
  //     localStorage.setItem(process.env.REACT_APP_IS_SHOW_WALLETS, "true");
  //     props.stripeHandleClose(false);
  //     props.setWalletModal(false);
  //   }
  // };

  return (
    <>
      <div
        className="wallet_box"
        onClick={() => {
          // showWalletInfo(0, "metamask");
        }}
      >
        <figure>
          {" "}
          <img src={METAMASK} alt="metamsk" />{" "}
        </figure>
        <p>METAMASK</p>
      </div>
      <div
        className="wallet_box"
        // onClick={() => {
        //   showWalletInfo(2, "walletconnect");
        // }}
      >
        <figure>
          {" "}
          <img src={WALLETCONNECT} alt="social" />{" "}
        </figure>
        <p>WalletConnect</p>
      </div>
      <div
        className="wallet_box"
        onClick={() => {
          // showWalletInfo(1, "coinbase");
        }}
      >
        <figure>
          {" "}
          <img src={COINBASE} alt="coinbase" />{" "}
        </figure>
        <p>COINBASE</p>
      </div>
    </>
  );
}

export default WalletList;
