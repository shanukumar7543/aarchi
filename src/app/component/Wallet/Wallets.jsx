import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";

import { useAccount, WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import WalletList from "./WalletList";
import "./Wallets.scss";
import { useNavigate } from "react-router-dom";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
    publicProvider(),
  ]
);

// Set up client
const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({ chains, options: { appName: "wagmi" } }),
    new WalletConnectConnector({
      chains,
      // options: {
      //   projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
      //   showQrModal: true,
      // },
    }),
  ],
  provider,
  webSocketProvider,
});

function Wallets(props) {
  console.log(props.selectedCard);
  const [show, setShow] = useState(false);
  const [isShowInfo, setShowInfo] = useState(false);
  const { isConnected } = useAccount();

  let navigate = useNavigate("/activate-account");

  useEffect(() => {
    if (isConnected) {
      handleClose();
      if (
        localStorage.getItem("wagmi.connected") &&
        localStorage.getItem("is_connecting")
      ) {
        navigate("/activate-account");
        localStorage.removeItem("is_connecting");
      }
    }
    props.walletModalClose({ isConnected });
    // Navigate();
  }, [isConnected]);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  // let Navigate = useNavigate();
  // const nextPage = () => {
  //   Navigate("/activate-account");
  // };
  console.log("63", props.selectedCard);

  return (
    <>
      <div>
        <div className="buy-container">
          <div className="row">
            <div className="col-md-8 col-12">
              <div className="amount-input">
                <div className="input-group">
                  <div className="input-group-prepend prev input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="text"
                    className="form-control amount"
                    placeholder=""
                    onChange={(e) => {
                      localStorage.setItem("inputAmount", e.target.value);
                    }}
                  />
                  <div className="input-group-prepend next">
                    <Link className="input-group-text" onClick={handleShow}>
                      MAX
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <button className="btn buy_button home" onClick={handleShow}>
                BUY
              </button>
            </div>
          </div>
        </div>

        {props.selectedCard.is_utopia && (
          <div>
            <h2 className="global">UTOPIA PRICE</h2>
            <div className="label_title">
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>
                      {props.selectedCard.is_utopia
                        ? "UTOPIA PRICE"
                        : "ABUNDANCE PRICE"}
                    </h3>{" "}
                    <span>$28,172</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>
                      {props.selectedCard.is_utopia
                        ? "CIRCULATING UTOPIA "
                        : "CIRCULATING ABUNDANCE"}
                    </h3>{" "}
                    <span>3,766</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>DILUTED MARKETCAP</h3> <span>18,450</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>MARKETCAP</h3> <span>$106,102</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>
                      {props.selectedCard.is_utopia
                        ? "STAKED UTOPIA"
                        : " STAKED ABUNDANCE"}
                      ...
                    </h3>{" "}
                    <span>3,766</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>
                      {props.selectedCard.is_utopia
                        ? "BURNED UTOPIA"
                        : "BURNED ABUNDANCE"}
                    </h3>{" "}
                    <span>18,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {props.selectedCard.is_abundance_token && (
          <div>
            {" "}
            <h2 className="global">ABUNDANCE PRICE</h2>
            <div className="label_title">
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>
                      {props.selectedCard.is_utopia
                        ? "UTOPIA PRICE"
                        : "ABUNDANCE PRICE"}
                    </h3>{" "}
                    <span>$28,172</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>CIRCULATING ABUNDANCE</h3> <span>3,766</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>DILUTED MARKETCAP</h3> <span>18,450</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>MARKETCAP</h3> <span>$106,102</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>STAKED ABUNDANCE</h3> <span>3,766</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>BURNED ABUNDANCE</h3> <span>18,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {props.selectedCard.is_user_balance && (
          <div>
            <h2 className="global">PERSONAL BALANCES</h2>
            <div className="label_title">
              <div className="row">
                <div className="col-md-4 col-12">
                  <div className="market_block">
                    <h3>WRAPPED & BALANCE</h3> <span>$0</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="market_block">
                    <h3>ABUNDANCE BALANCE</h3> <span>0</span>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="market_block">
                    <h3>UTOPIA BALANCE</h3> <span>0</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block market">
                    <h3>STAKED ABUNDANCE BALANCE</h3> <span>0</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block market">
                    <h3>STAKED UTOPIA BALANCE</h3> <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="home-buy-modal"
      >
        <Modal.Body>
          <div className="wallet_block">
            <CloseCircleOutlined className="exit" onClick={handleClose} />
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
                  <WagmiConfig client={wagmiClient}>
                    <WalletList
                      isShowInfo={isShowInfo}
                      closeWalletModal={handleClose}
                    />
                  </WagmiConfig>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Wallets;
