import React from "react";
import '@rainbow-me/rainbowkit/styles.css';
import {
    RainbowKitProvider,
    darkTheme as RainDark,
    connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
    metaMaskWallet,
    braveWallet,
    rainbowWallet,
    walletConnectWallet,
    coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import WalletConnectBtn from "./WalletConnectBtn";
import './Wallets.scss';

const { chains, provider } = configureChains([mainnet], [publicProvider()]);
const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ chains }),
            braveWallet({ chains }),
            rainbowWallet({ chains }),
            walletConnectWallet({ chains }),
            coinbaseWallet({ chains, appName: 'MVP APP' }),
        ],
    },
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

function WagmiBtn() {
    return (
        <>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider
                    chains={chains}
                    coolMode
                    theme={RainDark({
                        accentColor: '#7b3fe4',
                        accentColorForeground: 'white',
                        overlayBlur: 'small',
                    })}
                >
                    <WalletConnectBtn />
                </RainbowKitProvider>
            </WagmiConfig>
        </>
    );
}

export default WagmiBtn;