import React, { useEffect, useState } from "react";
import "./style.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Modal from "react-bootstrap/Modal";
import CREDITCARD from "../../../assets/images/credit-card.png";
import WALLET from "../../../assets/images/wallet.png";
import USDT from "../../../assets/images/usdt.svg";
import QRCODE from "../../../assets/images/qr-code.svg";
import WalletInfoModal from "../Wallet/WalletInfoModal";
import { ToastContainer, toast } from "react-toastify";
import { stripePaymentApi } from "../../utils";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_PK);

const Index = (props) => {
  const [isActiveBtn, setActiveBtn] = useState(false);
  const [isShowWalletModal, setWalletModal] = useState(false);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  const [paymentForm, setPaymentForm] = useState({
    name: "",
    email: "",
    card_number: "",
    month: "",
    year: "",
    cvv: "",
    code: "",
    amount: props.price,
  });
  console.log("10101010", paymentForm);

  const isValidateForm = () => {
    if (paymentForm.card_number === "") {
    } else if (paymentForm.mm === "") {
    } else if (paymentForm.cvv) {
    } else if (paymentForm.code === "") {
    }
  };

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value,
    });
  };

  useEffect(() => {
    let lable = "th";
    if (currentDay > 3 && currentDay < 21) {
      lable = "th";
      setCurrentDay(currentDay + lable);
    } else if (currentDay < 3 && currentDay > 21) {
      switch (currentDay % 10) {
        case 1:
          lable = "st";
          setCurrentDay(currentDay + lable);
          break;
        case 2:
          lable = "nd";
          setCurrentDay(currentDay + lable);
          break;
        case 3:
          lable = "rd";
          setCurrentDay(currentDay + lable);
          break;
        case 4:
          lable = "th";
          setCurrentDay(currentDay + lable);
          break;
      }
    }
  }, [currentDay]);

  const navigate = useNavigate();

  const paymentAdd = (paymentForm) => {
    stripePaymentApi(paymentForm)
      .then((response) => {
        console.log("545445s", response);
        if (response.status === 200) {
          toast.success("Payment completed.");
          localStorage.setItem("responseApi", JSON.stringify(response.data));
          setTimeout(() => {
            navigate("/activate-account");
          }, 4000);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="main-section">
      <div className="btn_div">
        <a
          className={`btn_button green ${!isActiveBtn ? "active" : ""}`}
          onClick={() => setActiveBtn(false)}
        >
          <img src={CREDITCARD} alt="card" />
        </a>
        <a
          className={`btn_button green ${isActiveBtn ? "active" : ""}`}
          onClick={() => setActiveBtn(true)}
        >
          <img src={WALLET} alt="wallet" />
        </a>
      </div>

      {!isActiveBtn ? (
        <div className="card-wrapper">
          <p className="card_detail">
            You will be charged a total of ${props.price} per month renewing on
            the {currentDay} of each month, please enter your card details below
          </p>

          <div className="row p-4 card-detail">
            <div className="col-12 mb-2">
              <input
                className="Card-no"
                type="text"
                placeholder="Please Enter Your name"
                name="name"
                value={paymentForm.name}
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>
            <div className="col-12 mb-2">
              <input
                className="Card-no"
                type="text"
                placeholder="Please Enter Your Email"
                name="email"
                value={paymentForm.email}
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>
            <div className="col-12 mb-2">
              <input
                className="Card-no"
                type="text"
                placeholder="4214 5246 4585"
              />
            </div>
            <div className="col-4  MM-AA">
              <input
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                }}
                className="input"
                type="text"
                placeholder="MM"
                name="month"
                value={paymentForm.month}
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>
            <div className="col-4  MM-AA">
              <input
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                }}
                className="input"
                type="text"
                placeholder="yy"
                name="year"
                value={paymentForm.year}
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>
            <div className="col-4 CVC">
              <input
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                }}
                className="input"
                type="text"
                placeholder="CVV"
                name="cvv"
                value={paymentForm.cvv}
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>
            <div className="col-6 Coupon">
              <label className="coupon-label">Got a Coupon Code ?</label>{" "}
              <input
                style={{
                  marginLeft: "0",
                  marginRight: "0",
                }}
                className="input coupon"
                type="text"
                name="code"
                value={paymentForm.code}
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>
            <button
              className="btn-0"
              onClick={() => {
                // setWalletModal(true);
                isValidateForm();
                paymentAdd(paymentForm);
              }}
            >
              <h3> PAY ${props.price}</h3>
            </button>
            <ToastContainer />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p className="card_detail">Pay USDT using your wallet balance</p>
            <p className="card_detail">Choose Network</p>
            <a href="" className="payment_detail active">
              <span>TRON (TRC20)</span>
              <br />
              <span>Fee: 1.00 USDT</span>
            </a>
            <a href="" className="payment_detail">
              <span>MATIC (polygon)</span>
              <br />
              <span>Fee: 0.25 USDT</span>
            </a>
            <a href="" className="payment_detail">
              <span>BNB Smart Chain BSC (BEP20)</span>
              <br />
              <span>Fee: 0.29 USDT</span>
            </a>
            <a href="" className="payment_detail">
              <span>Binance Chain (BEP2)</span>
              <br />
              <span>Fee: 0.80 USDT </span>
            </a>
            <a href="" className="payment_detail">
              <span>ETH (ERC-20)</span>
              <br />
              <span>Fee: 4.19 USDT </span>
            </a>

            <button className="submit_btn" type="submit">
              PAY <img src={USDT} alt="usdt" />
              {props.price}
            </button>

            <p className="card_detail mt-2">Scan QR code</p>

            <figure className="text-center">
              <img src={QRCODE} alt="qrcode" />
            </figure>

            <h6 className="affiliate">
              Your affiliate link is : <br />
              <a href="#">https://username.abundancepower.org</a>
            </h6>

            <p className="card_detail">Waiting for payment to be recieved</p>
          </div>
        </div>
      )}

      <Modal
        show={isShowWalletModal}
        onHide={() => {
          setWalletModal(false)
        }}
        animation={false}
        className="home-buy-modal"
      >
        <Modal.Body>
          <WalletInfoModal
            isShowWalletModal={isShowWalletModal}
            setWalletModal={setWalletModal}
            stripeHandleClose={props.stripeHandleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Index;
