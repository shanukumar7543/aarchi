import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  CloseCircleOutlined,
  RightOutlined,
  // LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Card from "../../component/Card";
import GlobalPrice from "./GlobalPrice";
import DisconnectWallet from "../../component/DisconnectWallet/DisconnectWallet";
import Strip from "../../component/Strip/index";
import {
  ChangeTheameMode,
  // getMemberShipApi,
  otpLoginApi,
  saveLoginApi,
  toggleSidebar,
  wagmiConnectButton,
} from "../../utils";
import { Plans } from "../../_constants/plans";
import User from "../../../assets/images/user.svg";
import moon from "../../../assets/icons/moon.png";
import sun from "../../../assets/icons/sun.png";
import copy from "../../../assets/icons/copy.png";
import telegram from "../../../assets/icons/telegram.png";
import fb from "../../../assets/icons/fb.png";
import instagram from "../../../assets/icons/instagram.png";
import linkedin from "../../../assets/icons/linkedin.png";
import twitter from "../../../assets/icons/twitter.png";
import discord from "../../../assets/icons/discord.png";
import Slider from "../../component/Slider";
import Sidebar from "../../../Sidebar/Sidebar";
import WagmiBtn from "../../component/Wallet/WagmiBtn";
import "./home.scss";
import { Button } from "react-bootstrap";
// import contractAbi from "../API/contractAbi.json";
import { ToastContainer, toast } from "react-toastify";
export default function HomePage({
  setSidebarCollapsedActAcoount,
  isSidebarCollapsedActAcoount,
}) {
  const [tabIndex, setTabIndex] = useState();

  const [isShowStripeModal, setStripeModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isWalletConnected, setWalletConnection] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [planeList, setPlaneList] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    otp: "",
  });
  console.log("00001", loginForm);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const loginApi = (loginForm) => {
    saveLoginApi(loginForm)
      .then((response) => {
        console.log("545445s", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const otpVerifyHandler = () => {
    otpLoginApi(loginForm)
      .then((response) => {
        if (response.data.code === 200) {
          toast.success(" You are Login Sucessfully...");
          setTimeout(() => {
            setOpenLoginModal(false);
            setIsLogin(true);
          }, 6000);
        }
        console.log("545445s", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutHandler = () => {
    localStorage.clear();
    setOpenLoginModal(false);
    navigate("/");
    setIsLogin(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isConnected } = useAccount();

  console.log("selectedCard", selectedCard);

  let navigate = useNavigate();

  useEffect(() => {
    setDataInitially();
    let cardData = JSON.parse(localStorage.getItem("form_details1"));
    console.log("cardData1", cardData);
    if (cardData) {
      setPlaneList(cardData);
    }
  }, []);

  const setDataInitially = () => {
    if (localStorage.getItem(process.env.REACT_APP_PLAN_OR_WALLET)) {
      setTabIndex(
        Number(localStorage.getItem(process.env.REACT_APP_PLAN_OR_WALLET))
      );
    }
    setWalletConnection(
      localStorage.getItem(process.env.REACT_APP_WAGMI_CONNECTED)
    );
  };

  const onCloseWalletModal = (params) => {
    setDataInitially();
  };

  const stripeHandleClose = () => setStripeModal(false);
  const stripeHandleShow = () => setStripeModal(true);

  const planWallet = (flag) => {
    setTabIndex(flag);
    localStorage.setItem(process.env.REACT_APP_PLAN_OR_WALLET, flag);
    if (flag === 2) {
      wagmiConnectButton();
      localStorage.setItem(process.env.REACT_APP_IS_SHOW_WALLETS, "true");
    }
  };

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

  const handleClick = () => {
    toast.success("Login SuccessFully!");
  };

  const removeLocalStorage = () => {
    setWalletConnection(false);
    setTabIndex(0);
    setSelectedPrice("");
  };

  return (
    <div className="home-page" style={{ display: "flex", minHeight: "100vh" }}>
      <ToastContainer />
      <Sidebar
        setSidebarCollapsedActAcoount={setSidebarCollapsedActAcoount}
        isSidebarCollapsedActAcoount={isSidebarCollapsedActAcoount}
        IsActiveAccount={true}
      />

      <div className="bar-icon-mobile">
        {isSidebarCollapsed && (
          <span className="toggle-icon-mobile">
            <RightOutlined
              onClick={() => {
                setSidebarCollapsed(false);
              }}
            />
          </span>
        )}
      </div>

      <div className="wallet-container">
        <div className="theme-icon">
          <span
            className="show-in-mobile"
            style={{
              float: "left",
              position: "absolute",
              top: "90px",
              left: "-5px",
            }}
            onClick={() => {
              toggleSidebar();
            }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </span>

          {isWalletConnected ? (
            <DisconnectWallet onClick={() => removeLocalStorage()} />
          ) : (
            ""
          )}
          <img
            src={User}
            width="25"
            className="user"
            alt="user"
            style={{ marginLeft: "0px" }}
          />
          {darkMode ? (
            <img
              onClick={() => {
                ChangeTheameMode();
                setDarkMode(!darkMode);
              }}
              src={moon}
              width="25"
              className="eye-img"
              alt="moon"
            />
          ) : (
            <img
              onClick={() => {
                ChangeTheameMode();
                setDarkMode(!darkMode);
              }}
              src={sun}
              width="25"
              className="eye-img"
              alt="sun"
            />
          )}
          {!isLogin ? (
            <div>
              <Button
                style={{
                  border: "0",
                  marginLeft: "10px",
                  background:
                    "linear-gradient(180deg, #8501a8 0%, #38b6ff 100%)",
                }}
                onClick={() => {
                  setOpenLoginModal(true);
                  console.log("hellloe  ");
                }}
              >
                Login
              </Button>
            </div>
          ) : (
            <div>
              <Button
                style={{
                  border: "0",
                  marginLeft: "10px",
                  background:
                    "linear-gradient(180deg, #8501a8 0%, #38b6ff 100%)",
                }}
                onClick={() => {
                  logoutHandler();
                  console.log("hellloe  ");
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>

        <div className="wallet-content">
          <div className="head">
            <h3 className="stake-people">INVEST IN PEOPLE NOT JUST ASSET</h3>
            <div className="top-icons">
              <img src={copy} alt="Copy" />
              <img src={telegram} alt="Telegram" />
              <img src={fb} alt="FaceBook" />
              <img src={instagram} alt="Instagram" />
              <img src={linkedin} alt="Linkedin" />
              <img src={twitter} alt="Twitter" />
              <img src={discord} alt="Discord" />
            </div>
          </div>

          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-md-6 col-12 btn-member">
              <button
                className="btn connect_button membership"
                style={{ width: "490px", margin: "0.25rem" }}
                onClick={() => {
                  planWallet(1);
                }}
              >
                {isWalletConnected
                  ? "UPGRADE MEMBERSHIP"
                  : "JOIN OUR MEMBERSHIP"}
              </button>
            </div>

            <div className="col-md-6 col-12 btn-1">
              <WagmiBtn />
              <button
                className="btn connect_button"
                style={{ width: "490px", margin: "0.25rem" }}
                onClick={() => {
                  planWallet(2);
                }}
              >
                {isWalletConnected ? "UPGRADE WALLET" : "CONNECT WALLET"}
              </button>
            </div>
          </div>

          {isLogin ? (
            <div>{<Slider setSelectedCard={setSelectedCard} />}</div>
          ) : (
            <div>
              <div>
                <h3 className="global">PERSONAL BALANCES</h3>
              </div>
              <div
                className="col-lg-4 col-md-4 col-12 balances"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="firstdiv m-2">
                  <div className="text">
                    <h3>$ BALANCE</h3>
                    <h2>$0</h2>
                  </div>
                </div>
                <div className="firstdiv m-2">
                  <div className="text">
                    <h3>ABUNDANCE BALANCE</h3>
                    <h2>0</h2>
                  </div>
                </div>
                <div className="firstdiv m-2">
                  <div className="text">
                    <h3>UTOPIA BALANCE</h3>
                    <h2>0</h2>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 className="global">MEMBERSHIP OPTIONS</h2>

            <Button
              onClick={() => {
                setSelectedButton(0);
              }}
              style={{
                background:
                  "linear-gradient(0deg, rgb(255, 56, 56) 30%, rgb(133, 1, 168) 100%)",
                borderRadius: "30px",
                width: "160px",
                height: "50px",
                marginRight: "-35px",
                border: "0",
                position: "relative",
                zIndex: "1",
              }}
            >
              Monthly
            </Button>
            <Button
              onClick={() => {
                setSelectedButton(1);
              }}
              style={{
                background: "linear-gradient(180deg, #f467ec 0%, #38b6ff 100%)",
                borderRadius: "30px",
                width: "170px",
                height: "50px",
                border: "0",
                position: "relative",
                zIndex: "0",
                marginLeft: "-12px",
              }}
            >
              Annually
            </Button>
            <div
              className="d-flex plan-container"
              style={{
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              {planeList.map((cardDetails, k) => {
                return (
                  <div
                    key={k}
                    className="col-lg-4 col-md-6 col-10 m-2 plan-card"
                  >
                    <div>
                      <Card
                        cardDetails={cardDetails}
                        onClick={stripeHandleShow}
                        setSelectedPrice={setSelectedPrice}
                        selectedButton={selectedButton}
                      />
                    </div>
                  </div>
                );
              })}
              ) : (
              {tabIndex === 2 && (
                <>
                  <Slider setSelectedCard={setSelectedCard} />
                  <GlobalPrice
                    selectedCard={selectedCard}
                    walletModalClose={(params) => onCloseWalletModal(params)}
                  />
                  <div>
                    <h2 className="global">MEMBERSHIP OPTIONS</h2>

                    <Button
                      onClick={() => {
                        setSelectedButton(0);
                      }}
                      style={{
                        backgroundColor: "rgb(199,30,106)",
                        borderRadius: "30px",
                        width: "225px",
                        height: "50px",
                      }}
                    >
                      Monthly
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedButton(1);
                      }}
                      style={{
                        backgroundColor: "rgb(87,109,220)",
                        borderRadius: "30px",
                        marginLeft: "-40px",
                        width: "225px",
                        height: "50px",
                      }}
                    >
                      Annually
                    </Button>
                    <div className="d-flex">
                      {planeList.map((cardDetails, k) => {
                        return selectedCard.category ===
                          cardDetails.category ? (
                          <div
                            key={k}
                            className="col-12 col-sm-6 col-xl-4 m-2 plan-card"
                          >
                            <div>
                              <Card
                                price={cardDetails.price}
                                price2={cardDetails.price2}
                                title={cardDetails.title}
                                category={cardDetails.category}
                                monthly={cardDetails.monthly}
                                annually={cardDetails.annually}
                                planeList={cardDetails.planeList ?? []}
                                buttonText={cardDetails.text}
                                buttonlink={cardDetails.link}
                                wysiwyg_editor={cardDetails.wysiwyg_editor}
                                onClick={stripeHandleShow}
                                setSelectedPrice={setSelectedPrice}
                                selectedButton={selectedButton}
                              />
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <>
              <Modal
                className="strip-payment-modal"
                show={isShowStripeModal}
                onHide={stripeHandleClose}
              >
                <Modal.Body>
                  <div style={{ float: "right" }}>
                    <CloseCircleOutlined
                      onClick={() => {
                        stripeHandleClose();
                      }}
                    />
                  </div>
                  <Strip
                    price={selectedPrice}
                    stripeHandleClose={stripeHandleClose}
                    setOpenLoginModal={setOpenLoginModal}
                  />
                </Modal.Body>
              </Modal>

              {/* <Button onClick={handleOpen}>Open modal</Button> */}
              <Modal
                className="strip-payment-modal login-modal"
                show={openLoginModal}
              >
                <Modal.Body>
                  <div style={{ float: "right" }}>
                    <CloseCircleOutlined
                      onClick={() => {
                        setOpenLoginModal(false);
                      }}
                    />
                  </div>

                  <div className="Login-form-modal">
                    <h2>LOGIN</h2>
                    <form>
                      <div className="input-group ">
                        <input
                          type="email"
                          placeholder="Enter Your Email"
                          name="email"
                          value={loginForm.email}
                          onChange={(e) => {
                            inputHandler(e);
                          }}
                          className="email-field"
                        />
                        <div className="input-group-append">
                          <button
                            onClick={() => {
                              loginApi(loginForm);
                              setOpenLoginModal(false);
                            }}
                            type="button"
                            className="otp-btn"
                          >
                            Get OTP
                          </button>
                        </div>
                      </div>

                      <div className="input-group">
                        <input
                          type="text"
                          name="otp"
                          value={loginForm.otp}
                          onChange={(e) => {
                            inputHandler(e);
                          }}
                          placeholder="Enter OTP"
                          className="otp-field"
                        />
                      </div>

                      <div className="input-group">
                        <button
                          onClick={() => {
                            otpVerifyHandler();
                          }}
                          type="button"
                          className="btn btn-primary signin-btn mt-2"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
