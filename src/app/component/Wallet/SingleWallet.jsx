import React, { useEffect } from "react";
import { useAccount, WagmiConfig, createClient, configureChains } from "wagmi";
import { useNavigate } from "react-router-dom";
import { mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import WalletList from "./WalletList";
import "./Wallets.scss";

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
      //     projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
      //     showQrModal: true,
      // },
    }),
  ],
  provider,
  webSocketProvider,
});

function SingleWallet(props) {
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
  }, []);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <WalletList
          isShowInfo={props.isShowInfo}
          setWalletModal={props.setWalletModal}
          stripeHandleClose={props.stripeHandleClose}
        />
      </WagmiConfig>
    </>
  );
}

export default SingleWallet;
