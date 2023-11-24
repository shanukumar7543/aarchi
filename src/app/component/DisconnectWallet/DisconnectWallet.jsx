import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import Disconnect from "./DisconnectBtn";

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
      // },
    }),
  ],
  provider,
  webSocketProvider,
});

function DisconnectWallet() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Disconnect />
      </WagmiConfig>
    </>
  );
}

export default DisconnectWallet;
