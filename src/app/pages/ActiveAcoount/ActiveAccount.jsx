import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DatePicker } from "antd";
import Profile from "../../../assets/images/profile_user.png";
import man from "../../../assets/images/man.png";
import CloseEye from "../../../assets/images/close_eye.svg";
import moon from "../../../assets/icons/moon.png";
import sun from "../../../assets/icons/sun.png";
import User from "../../../assets/images/user.svg";
import DatePickerIcon from "../../../assets/images/date.svg";
import InfinityIcon from "../../../assets/images/infinity.svg";
import { ChangeTheameMode, toggleSidebar } from "../../utils";
import MintMemberShip from "../../component/MintMemberShip/MintMembership";
import DisconnectWallet from "../../component/DisconnectWallet/DisconnectWallet";
import GaugeCharts from "./gaugechart";
import DoughnutChart from "./donutchart";
import "./ActiveAccount.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Sidebar from "../../../Sidebar/Sidebar";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const parseDate = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return day + "-" + month + "-" + year;
};

function Index({
  setSidebarCollapsedActAcoount,
  isSidebarCollapsedActAcoount,
}) {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(111);
  const [selectedFrequency, setSelectedFrequency] = useState("month");
  const [units, setUnits] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [isShowCustomModal, setCustomModal] = useState(false);
  const [everyDayOfTheMonth, setEveryDayOfMonth] = useState();
  const [everyDayOfTheWeek, setEveryDayOfWeek] = useState();
  const [getOrdinal, setOrdinal] = useState();

  const [manLength, setManLength] = useState(0);
  const [chartVal, setChartVal] = useState(null);

  const createManList = (amount) => {
    const noOfMen = Math.round(amount / 12);
    const menList = [];
    for (let index = 0; index < noOfMen; index++) {
      menList.push(<img src={man} alt="man" key={index} />);
    }
    if (noOfMen !== manLength) {
      setManLength(noOfMen);
    }
    return menList;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const calculateUnitValue = (type, dates = null) => {
    let date = new Date();
    setSelectedFrequency(type);
    if (type !== "datepicker") {
      setStartDate("");
    } else {
      date = parseDate(dates);
      setUnits(date);
      return;
    }
    let daysCal = 24 * 3600 * 1000;
    switch (type) {
      case "month":
        date = new Date(
          date.getTime() + noOfDaysInMonth[date.getMonth()] * daysCal
        );
        break;
      case "week":
        date = new Date(date.getTime() + 7 * daysCal);
        break;
      case "2week":
        date = new Date(date.getTime() + 14 * daysCal);
        break;
      case "day":
        date = new Date(date.getTime() + 1 + daysCal);
        break;
      case "custom":
        date = calculateCustomDate();
        break;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setUnits(day + "-" + month + "-" + year);
  };

  const calculateCustomDate = () => {
    let date;
    if (getOrdinal && everyDayOfTheWeek) {
      let year = new Date().getFullYear(),
        month = new Date().getMonth();
      let d = new Date(year, month, 1);
      d.setUTCHours(0, 0, 0, 0);
      const ordinalValue =
        7 * Number(getOrdinal) +
        Number(everyDayOfTheWeek) -
        d.getUTCDay() -
        (d.getUTCDay() <= Number(everyDayOfTheWeek) ? 7 : 0);
      d.setUTCDate(d.getUTCDate() + ordinalValue);
      date = d;
    } else if (!everyDayOfTheWeek && everyDayOfTheMonth) {
      let currentDate = new Date();
      const dateCopy = new Date(currentDate.getTime());
      date = new Date(
        dateCopy.setDate(
          dateCopy.getDate() +
            ((7 - dateCopy.getDay() + Number(everyDayOfTheMonth)) % 7 || 7)
        )
      );
    }
    return date;
  };

  const [darkMode, setDarkMode] = useState(false);
  const [userForm, setUserForm] = useState({
    id: "",
    name: "",
    bio: "",
    email: "",
    dreams: "",
    interest: "",
    your_affiliate_link: "",
    is_sponsor: true,
    sponsor_link: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
    streaming_keys1: "",
    streaming_keys2: "",
    streaming_keys3: "",
    streaming_keys4: "",
  });

  console.log("userFormadmin", userForm);

  const inputHandler = (e) => {
    console.log("event", e);
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("responseApi");
    if (data) {
      const json = JSON.parse(data);
      setUserForm({
        ...userForm,
        email: json.data.email,
        name: json.data.name,
      });
    }
  }, []);

  // const userAdd = (paymentForm) => {
  //   saveUserFormApi(paymentForm)
  //     .then((response) => {
  //       console.log("545445s", response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const formSubmitHandler = (userForm) => {
  //   saveUserApi(userForm)
  //     .then((response) => {
  //       console.log("545445s", response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <div className="activate-account-page" style={{ display: "flex" }}>
        <Sidebar
          setSidebarCollapsedActAcoount={setSidebarCollapsedActAcoount}
          isSidebarCollapsedActAcoount={isSidebarCollapsedActAcoount}
          IsActiveAccount={false}
        />

        <div className="active-acnt" style={{ overflowX: "hidden" }}>
          <div>
            <p className="alert-text">YOUR ACCOUNT IS CURRENTLY INACTIVE</p>
          </div>

          <div className="activate_account">
            <div className="row m-1">
              <div className="col-12">
                <div className="account">
                  <div className="account_form">
                    <div>{/* <h1>he</h1> */}</div>
                    <div className="theme-icon">
                      <span
                        className="show-in-mobile"
                        style={{
                          float: "left",
                          margin: "5px",
                          position: "absolute",
                          top: "115px",
                          left: "-5px",
                        }}
                        onClick={() => {
                          toggleSidebar();
                        }}
                      >
                        <ArrowForwardIosIcon fontSize="large" />
                      </span>
                      <DisconnectWallet />
                      <img src={User} width="25" className="user" alt="user" />
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
                    </div>

                    <h2 className="global active">ACTIVATE YOUR MEMBERSHIP</h2>

                    <h2 className="global member">
                      MEMBERSHIP BALANCE:
                      <span> ${localStorage.getItem("inputAmount") || 0}</span>
                    </h2>

                    <h2 className="global">
                      CREATE PROFILE & MINT MEMBERSHIP NFT
                    </h2>

                    <div className="first_block">
                      <div className="inner-content">
                        <div className="block-col">
                          <div className="col-lg-4 col-md-5 col-12">
                            <div className="profile_user">
                              <figure>
                                <img src={Profile} alt="profile" />
                              </figure>
                              <button
                                className="member_profile"
                                onClick={() => {
                                  handleShow();
                                }}
                              >
                                MINT YOUR MEMBERSHIP <br />
                                PROFILE NFT
                              </button>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 offset-md-1">
                            <div className="profile_user">
                              <h2 className="global member">
                                FREQUENCY: OPPORTUNIST
                              </h2>

                              <div className="form-group top">
                                <label className="label">Your Bio:</label>
                                <div className="block top-form bio-field">
                                  <input
                                    className="form-control amount bio"
                                    type="text"
                                    name="bio"
                                    placeholder="Enter Your Bio"
                                  />
                                </div>
                              </div>
                              <div className="form-group top">
                                <label className="label">Your Name:</label>
                                <div className="block top-form">
                                  <input
                                    className="form-control amount name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Name"
                                  />
                                </div>
                              </div>
                              <div className="form-group top">
                                <label className="label">
                                  Your Email Address:
                                </label>
                                <div className="block top-form">
                                  <input
                                    className="form-control amount name"
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email Address:"
                                  />
                                </div>
                              </div>

                              <div className="form-group top">
                                <label className="label">Your Dreams: </label>
                                <div className="block top-form">
                                  <input
                                    className="form-control amount name"
                                    type="text"
                                    name="dream"
                                    placeholder="Enter Your Dreams "
                                  />
                                </div>
                              </div>

                              <div className="form-group top">
                                <label className="label">Your Interests:</label>
                                <div className="block top-form">
                                  <input
                                    className="form-control amount name"
                                    type="text"
                                    name="intrest"
                                    placeholder="Enter Your Interests"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="block-col">
                          <div className="col-12 form-group">
                            <label className="label" htmlFor="#">
                              Please enter wallet address/affiliate link of
                              sponsor
                            </label>
                            <div className="block">
                              <input
                                type="text"
                                className="form-control wallet_input"
                                placeholder="Enter wallet address/affiliate link"
                                name="wallet_address"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 form-group">
                            <label className="label" htmlFor="#">
                              Please choose a username for your personal
                              affiliate link
                            </label>
                            <div className="block">
                              <input
                                type="text"
                                className="form-control wallet_input"
                                placeholder="Please choose a username for your personal affiliate link"
                                name="wallet_address"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 form-group">
                            <label className="label">
                              Your affiliate link will look like this
                            </label>
                            <a className="more_link" href="">
                              https://usename..abundancepower.org
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h2 className="global">ESTIMATED REWARDS CALCULATOR</h2>

                    <div className="second_block">
                      <div className="inner-content">
                        <div className="block-col">
                          {/* <div className="col-md-6 col-12"></div> */}
                          <div className="col-md-6 col-12 calender-section">
                            <div className="calender-sec-left">
                              <label className="payment_label payment mb-3">
                                Payment Frequency
                              </label>
                            </div>

                            <div className="calender-sec-right">
                              <div className="payment-label">
                                <label className="payment_label future mb-3">
                                  Preferred future <br />
                                  billing date
                                </label>
                              </div>
                              <div className="datepicker-wrapper">
                                {/* <input type="date" name="" id="" /> */}
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => {
                                    setCustomModal("");
                                    setEveryDayOfMonth("");
                                    setEveryDayOfWeek("");
                                    setStartDate(date);
                                    calculateUnitValue("datepicker", date);
                                  }}
                                />
                                <div
                                  className="dat-cal"
                                  onClick={() => {
                                    const element =
                                      document.querySelector(".ant-picker");
                                    element.click();
                                  }}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    className="datepicket-icon"
                                    src={DatePickerIcon}
                                    alt="datepicker"
                                  />
                                </div>
                              </div>
                              {startDate ? (
                                <div className="selected-date">
                                  <p>{parseDate(startDate)}</p>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <div className="col-md-12 col-12">
                            <div className="row">
                              <div className="col-12 col-lg-2 col-md-2 form-group">
                                <label className="text-start every">
                                  Every:
                                </label>
                                <label className="py-freq">
                                  Payment Frequency Every:
                                </label>
                              </div>
                              <div className="col-6 col-sm-4 col-md-2 form-group">
                                <span
                                  className={`payment_frequency ${
                                    selectedFrequency === "month" && "active"
                                  }`}
                                  onClick={() => {
                                    calculateUnitValue("month");
                                  }}
                                >
                                  1 MONTH
                                </span>
                              </div>
                              <div className="col-6 col-sm-4 col-md-2 form-group ">
                                <span
                                  className={`payment_frequency ${
                                    selectedFrequency === "week" && "active"
                                  }`}
                                  onClick={() => {
                                    calculateUnitValue("week");
                                  }}
                                >
                                  1 WEEK
                                </span>
                              </div>
                              <div className="col-6 col-sm-4 col-md-2 form-group">
                                <span
                                  className={`payment_frequency ${
                                    selectedFrequency === "2week" && "active"
                                  }`}
                                  onClick={() => {
                                    calculateUnitValue("2week");
                                  }}
                                >
                                  2 WEEKS
                                </span>
                              </div>
                              <div className="col-6 col-sm-4 col-md-2 form-group">
                                <span
                                  className={`payment_frequency ${
                                    selectedFrequency === "day" && "active"
                                  }`}
                                  onClick={() => {
                                    calculateUnitValue("day");
                                  }}
                                >
                                  1 DAY
                                </span>
                              </div>
                              <div className="col-6 col-sm-4 col-md-2 form-group">
                                <a
                                  className={`payment_frequency ${
                                    selectedFrequency === "custom" && "active"
                                  }`}
                                  onClick={() => {
                                    setSelectedFrequency("custom");
                                    setCustomModal(true);
                                  }}
                                >
                                  CUSTOM
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="block-col mt-4">
                          <div className="form-group">
                            <div
                              className="d-flex justify-content-between"
                              style={{ width: "100%", flexWrap: "nowrap" }}
                            >
                              <label className="form-label range custom">
                                ${amount}
                              </label>
                              <input
                                type="range"
                                className="form-range"
                                min="111"
                                max="999"
                                name="amount"
                                value={amount}
                                onChange={(e) => {
                                  setAmount(e.target.value);
                                }}
                                required
                              />
                              <label className="form-label range">
                                <img src={InfinityIcon} alt="infinity" />
                              </label>
                            </div>
                          </div>
                          <div className="mt-3" style={{ width: "100%" }}>
                            <div
                              className="d-flex "
                              style={{
                                width: "100%",
                                flexWrap: "wrap",
                              }}
                            >
                              <label>Got a coupon ?</label>
                              <input
                                className="gradient-border"
                                type="text"
                                style={{
                                  border: "none",
                                  marginLeft: "10px",
                                  marginBottom: "10px",
                                }}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 mt-4">
                              <div className="meter_block">
                                <figure className="left">
                                  <GaugeCharts setChartVal={setChartVal} />
                                </figure>
                                <p>
                                  What percentage do you want to loan to your
                                  team {chartVal}?
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-7 col-12">
                              <p className="mt-3 text-start">
                                Amount of members you can stake in{" "}
                                <span className="period">{manLength}</span>
                              </p>

                              <div className="d-flex">
                                <a className="text-start">
                                  {createManList(amount)}
                                </a>
                              </div>

                              <p className="mt-3 text-start">
                                Based on your current balance your membership
                                will be active until :
                                <span className="period d-block">{units}</span>
                              </p>

                              <div className="row">
                                <div className="form-group">
                                  <label className="balance_label text-start">
                                    Auto Topup when my balance falls below
                                  </label>
                                  <div className="input-group account_balance">
                                    <div className="input-group-prepend prev">
                                      <span className="input-group-text">
                                        $
                                      </span>
                                    </div>
                                    <input
                                      type="text"
                                      className="form-control amount"
                                      placeholder="Amount"
                                    />
                                  </div>
                                </div>
                              </div>

                              <h2 className="global text-start">
                                EXPECTED MIN REWARDS:
                              </h2>

                              <p className="text-start">
                                Math needs to be worked out along with
                                tokenomics
                              </p>
                            </div>

                            <div className="col-md-5 col-12">
                              <p className="text-center adjust_text">
                                ADJUST INDIVIDUAL % OF LOAN FOR EACH OF YOUR
                                RECRUITS BELOW
                              </p>
                              <figure className="text-center">
                                <div style={{ position: "relative" }}>
                                  <div>
                                    <DoughnutChart />
                                  </div>
                                  <span
                                    style={{
                                      color: "blue",
                                      fontSize: "40px",
                                      position: "absolute",
                                      top: 220,
                                      left: 210,
                                    }}
                                  >
                                    3/9
                                  </span>
                                </div>
                              </figure>
                            </div>
                          </div>

                          <div
                            className="row"
                            style={{ width: "100%", margin: "auto" }}
                          >
                            <div className="btn_div">
                              <div className="button_block">
                                <button className="btn btn-success">
                                  ACTIVATE MEMBERSHIP
                                </button>
                              </div>
                              {/* <div className="button_block">
                          <button className="btn btn-success">
                            UPDATE MEMBERSHIP
                          </button>
                        </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h2 className="global">ADD SHIPPING DETAILS</h2>

                    <div className="third_block">
                      <div className="inner-content">
                        <h2
                          className="global text-start"
                          style={{ marginTop: "20px" }}
                        >
                          WHERE CAN WE SEND YOU YOUR GIFTS
                        </h2>

                        <div className="block-col">
                          <div className="col-12 form-group bottom">
                            <label className="label country" htmlFor="add1">
                              Address Line 1:{" "}
                            </label>
                            <div className="block">
                              <input
                                type="text"
                                className="form-control wallet_input"
                                id="add1"
                                placeholder="Address Line 1"
                                name="wallet_address"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 form-group bottom">
                            <label className="label country" htmlFor="add2">
                              Address Line 2:{" "}
                            </label>
                            <div className="block">
                              <input
                                type="text"
                                className="form-control wallet_input"
                                id="add2"
                                placeholder="Address Line 2"
                                name="wallet_address"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 form-group bottom">
                            <label className="label country" htmlFor="add3">
                              Address Line 3:{" "}
                            </label>
                            <div className="block">
                              <input
                                type="text"
                                className="form-control wallet_input"
                                id="add3"
                                placeholder="Address Line 3"
                                name="wallet_address"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 form-group bottom">
                            <label className="label country" htmlFor="country">
                              Country:{" "}
                            </label>
                            <div className="block">
                              <input
                                type="text"
                                className="form-control wallet_input"
                                id="country"
                                placeholder="Country"
                                name="wallet_address"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 form-group bottom">
                            <label className="label country" htmlFor="pincode">
                              Postal Code:{" "}
                            </label>
                            <div className="block">
                              <input
                                type="text"
                                className="form-control wallet_input"
                                id="pincode"
                                placeholder="Postal Code"
                                name="wallet_address"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="btn_div">
                        <div className="button_block">
                          <button className="btn btn-success">
                            UPDATE MEMBERSHIP
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={isShowCustomModal}
        onHide={() => setSelectedFrequency("custom")}
        className="custom-date-modal"
      >
        <Modal.Header closeButton onClick={() => setCustomModal(false)}>
          <Modal.Title>Payment Frequency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div className="col-12">
                <label>Every Week Of the Month</label>
                <select
                  className="form-control form-group amount"
                  onChange={(e) => {
                    setEveryDayOfMonth(e.target.value);
                    setEveryDayOfWeek("");
                    setOrdinal("");
                  }}
                >
                  <option value={""}>Select</option>
                  <option value={0}>Sunday</option>
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                  <option value={4}>Thursday</option>
                  <option value={5}>Friday</option>
                  <option value={6}>Saturday</option>
                </select>
              </div>
            </div>

            <div className="row">
              <label>Every day Of the Week</label>
              <div className="col-12 col-md-6 mb-2">
                <select
                  className="form-control amount"
                  onChange={(e) => {
                    setOrdinal(e.target.value);
                  }}
                >
                  <option value={""}>Select</option>
                  <option value={1}>1st</option>
                  <option value={2}>2nd</option>
                  <option value={3}>3rd</option>
                  <option value={4}>4th</option>
                </select>
              </div>

              <div className="col-12 col-md-6 mb-2">
                <select
                  className="form-control amount"
                  onChange={(e) => {
                    setEveryDayOfWeek(e.target.value);
                    setEveryDayOfMonth("");
                  }}
                >
                  <option value={""}>Select</option>
                  <option value={0}>Sunday</option>
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                  <option value={4}>Thursday</option>
                  <option value={5}>Friday</option>
                  <option value={6}>Saturday</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCustomModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              calculateUnitValue("custom");
              setCustomModal(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose} className="mint-membership">
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <HighlightOffIcon onClick={handleClose} />
          </div>
          <>
            <MintMemberShip />
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Index;
