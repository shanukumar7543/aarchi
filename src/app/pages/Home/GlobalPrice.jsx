import React from "react";
import { useState } from "react";
import { getAbudencePriceApi } from "../../utils";

function GlobalPrice(props) {
  const [getPrice, setGetPrice] = useState([]);

  const getData = () => {
    getAbudencePriceApi()
      .then((response) => {
        console.log("abudenceprice", response);
        setGetPrice(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {/* <div className="buy-container">
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
                                <Link className="input-group-text">
                                MAX
                                </Link>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4 col-12">
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

                        <button className="btn buy_button home" onClick={() => {
                            showWalletInfo();
                        }}>
                            BUY
                        </button>
                        </div>
                    </div>
                </div> */}

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
                    <span>${getPrice.abundancePrice}</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>CIRCULATING ABUNDANCE</h3>{" "}
                    <span>${getPrice.circulatingAbundance}</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>DILUTED MARKETCAP</h3>{" "}
                    <span>${getPrice.dilutedMarketcap}</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>MARKETCAP</h3> <span>${getPrice.marketcap}</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>STAKED ABUNDANCE</h3>{" "}
                    <span>${getPrice.stakedAbundance}</span>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="market_block">
                    <h3>BURNED ABUNDANCE</h3>{" "}
                    <span>${getPrice.burnedAbundance}</span>
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
    </>
  );
}

export default GlobalPrice;
