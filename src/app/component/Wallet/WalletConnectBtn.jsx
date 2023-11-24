import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import './Wallets.scss';

function WalletConnectBtn() {
    return (
        <>
            <div className="connect_btn"> <ConnectButton /> </div>
        </>
    );
}

export default WalletConnectBtn;