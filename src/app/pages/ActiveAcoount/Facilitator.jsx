import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moon from "../../../assets/icons/moon.png";
import sun from "../../../assets/icons/sun.png";
import User from "../../../assets/images/user.svg";
import { ChangeTheameMode, toggleSidebar } from "../../utils";
import MintMemberShip from "../../component/MintMemberShip/MintMembership";
import DisconnectWallet from "../../component/DisconnectWallet/DisconnectWallet";
// import "./ActiveAccount.scss";
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

function Facilitator({
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
  const [stepNumber, setStepNumber] = useState('1');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [darkMode, setDarkMode] = useState(false);

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

                    {/* <h2 className="global active">ACTIVATE YOUR MEMBERSHIP</h2>

                    <h2 className="global member">
                      MEMBERSHIP BALANCE:
                      <span> ${localStorage.getItem("inputAmount") || 0}</span>
                    </h2> */}

                    <h2 className="global">
                        BECOME A FACILITATOR
                    </h2>

                    {stepNumber==='1' &&
                    (<div className="first_block">
                       <div className="facilitator_content1">
                            <h1>Step 1:</h1>
                            <p>Enter the price you would like to charge per viewer for your session, The higher your frequency the higher you are able to charge. Then.select which frequencies you want to serve.</p>
                            <input class="form-control amount name amt_num" type="number" name="intrest" placeholder="$0"/>
                            <div className="row facilitator_checkboxes">
                                <div className="col-xl-3"><span>Frequencies:</span></div>
                                <div className="col-xl-3">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Opportunist</span>
                                </div>
                                <div className="col-xl-3">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Survival</span>
                                </div>
                                <div className="col-xl-3">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Creator</span>
                                </div>
                                <div className="col-xl-3">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Willpower</span>
                                </div>
                                <div className="col-xl-3">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Power Of Love</span>
                                </div>
                                <div className="col-xl-6">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Expression Of Power</span>
                                </div>
                                <div className="col-xl-3">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Wisdom</span>
                                </div>
                                <div className="col-xl-6">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Higher Purpose</span>
                                </div>
                                <div className="col-xl-3"></div>
                                <div className="col-xl-7">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span className="terms">Accept testimonials as a form of payment</span>
                                </div>
                                <div className="col-xl-5" style={{margin:"auto"}}>
                                    <span  className="terms">Skills Points Earned: 0</span>
                                </div>

                                <div className="col-xl-6">
                                    <span className="terms">Enter no. of testimonial sessions </span>
                                    <input class="form-control amount name frequencies_last_checkbox" type="checkbox" name="intrest" placeholder="$0"/>
                                </div>
                                <div className="col-xl-4" style={{margin:"auto 0"}}>
                                    <span  className="terms">(0 is unlimited)</span>
                                </div>
                            </div>
                       <button className="next_btn" onClick={()=>{setStepNumber('2')}}>Next</button>
                       </div>
                    </div>)}

                    {stepNumber==='2' &&
                    (<div className="second_block">
                        <div className="facilitator_content2">
                            <h1>Step 2:</h1>
                            <p>Select your topic & then create a catchy title for your event along with a description of what your session is about</p>
                            <div className="row facilitator_checkboxes">
                                <div className="col-xl-4">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Part of a series ?</span>
                                </div>
                                <div className="col-xl-8">
                                    <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                                    <span>Mint student NFT certificate upon completion ?</span>
                                </div>
                            </div>
                              <div className="row">
                                <div className="col-xl-6 profile_card">
                                    <div className="row">
                                        <div className="col-xl-3 profile_image">
                                            <img src="../../../../user_placeholder.jpg"></img>
                                        </div>
                                        <div className="col-xl-9 profile_data">
                                          <select class="form-control amount name amt_num" type="checkbox" name="intrest"></select>
                                          <input class="form-control amount name amt_num" type="checkbox" name="intrest"/>
                                        </div>
                                        <div className="col-xl-12 profile_data">
                                          <textarea class="form-control amount name amt_num" type="checkbox" name="intrest"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                   
                                </div>
                                <div className="col-xl-12 questions">
                                   <h3>Add Questions for the audience</h3>
                                   <input class="form-control amount name add_ques" type="number" name="intrest"></input>
                                   <a>Add New</a>
                                </div>
                                <div className="col-xl-12 questions" style={{marginTop:"30px"}}>
                                   <h3>Add Polls for the audience</h3>
                                   <input class="form-control amount name add_ques" type="number" name="intrest"></input>
                                   <a>Add New</a>
                                </div>
                            </div>
                            <button className="next_btn" onClick={()=>{setStepNumber('3')}}>Next</button>
                          </div>
                    </div>)}

                    {stepNumber==='3' &&
                    (<div className="second_block">
                      <div className="facilitator_content2">
                        <h1>Step 3:</h1>
                        <p>Decide where you would like to host your event</p>
                        <div className="row facilitator_checkboxes">
                          <div className="col-xl-3">
                              <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                              <span>Online</span>
                          </div>
                          <div className="col-xl-3">
                              <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                              <span>Offline</span>
                          </div>
                          <div className="col-xl-6">
                              <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                              <span>member collab</span>
                          </div>
                        </div>
                        <div className="step3_second_div">
                          <button>SHOW AVAILABILITY</button>
                          <img src={"./../../../../images/user.png"} alt="user_image"></img>
                          <img src={"./../../../../images/fb.png"} alt="facebook_image"></img>
                          <img src={"./../../../../images/calendar.png"} alt="calendar"></img>
                          <p>21 March 2023 14:00 - 16:00 UTC <br/> Cost: $15</p>
                        </div>
                        <p className="step3_p">If you have a large following would you like to earn from adding your own social media platforms as a place where our other  members can go live?</p>
                        <p className="step3_p">Provide streaming keys for your platforms</p>
                        <div className="step3_third_div">
                          <img src={"./../../../../images/fb.png"} alt="facebook_image"></img>
                          <input class="form-control amount name" type="number" name="intrest"></input>
                          <img src={"./../../../../images/calendar.png"} alt="calendar"></img>
                        </div>
                        <div className="step3_third_div">
                          <img src={"./../../../../images/insta.png"} alt="facebook_image"></img>
                          <input class="form-control amount name" type="number" name="intrest"></input>
                          <img src={"./../../../../images/calendar.png"} alt="calendar"></img>
                        </div>
                        <div className="step3_third_div">
                          <img src={"./../../../../images/tiktok.png"} alt="facebook_image"></img>
                          <input class="form-control amount name" type="number" name="intrest"></input>
                          <img src={"./../../../../images/calendar.png"} alt="calendar"></img>
                        </div>
                        <div className="step3_third_div">
                          <img src={"./../../../../images/yt.png"} alt="facebook_image"></img>
                          <input class="form-control amount name" type="number" name="intrest"></input>
                          <img src={"./../../../../images/calendar.png"} alt="calendar"></img>
                        </div>
                        <div className="col-xl-12" style={{marginTop:"20px",marginBottom:"20px"}}>
                          <input class="form-control amount name frequencies" type="checkbox" name="intrest" placeholder="$0"/>
                          <span>I want to be the host</span>
                        </div>
                      <button className="next_btn" onClick={()=>{setStepNumber('4')}}>Next</button>
                      </div>
                    </div>)}


                    {stepNumber==='4' &&
                    (<div className="second_block">
                      <div className="facilitator_content2">
                        <h1>Step 4:</h1>
                        <p>Would you like an opportunity to become a franchise owner of the abundity brand! Where you get to manage one of our reatreat and training facilities and run networking events exclusive to your area and build up members, while earning a % of profits from every event hosted at the facility!</p>
                        <div className="step3_second_div">
                          <button>LEARN MORE</button>
                        </div>
                        <button className="next_btn">Submit</button>
                      </div>
                    </div>)}

                    <h2 className="global">
                      YOUR SCHEDULED SESSIONS
                    </h2>

                    <div className="second_block">
                      <div className="facilitator_table_div">
                        <table>
                            <thead>
                              <tr>
                                <th>DATE</th>
                                <th>TIME</th>
                                <th>PRICE</th>
                                <th>FREQUENCY</th>
                                <th>TITLE</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="faci-td">12/03/2023</td>
                                <td className="faci-td">3PM UTC</td>
                                <td className="faci-td">$0</td>
                                <td className="faci-td">Opportunist</td>
                                <td></td>
                                <td><button>Copy Link</button></td>
                              </tr>
                              <tr>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td className="faci-td"></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="how_it_works">
                      <h1>HOW IT WORKS</h1>
                      <p><div>All sessions provided are free when you are on the frequency of opportunist, As soon as you reach the frequency of survival you are able to start charging members for your live sessions, the higher your frequency the more you are allowed to charge the viewers of your sessions.</div>
                      <div>As a facilitator you earn abundance tokens as soon as your session ends which you can use however you want across the ecosystem.  (min 30 minutes) this applies at opportunist frequency too.</div>
                      <div>All sessions work on a pro-rata basis, where a viewer is only charged based on their frequency, the higher their frequency the more you are able to charge them for your session.</div> 
                      <div>Charges are taken in affordable increments from returns made by a member never from capital of their balance!</div>
                      <div>Charges will never exceed x % of a members returns</div> 
                      <div>When a member watches your content and you have checked the “accept testimonials as form of payment” box, then at the end of the session they will be prompted to leave you a review and rating, this then nulls the charge they would have been charged and awards you skill points instead, where $1 = 1 skills point.</div>
                      <div>These skill points can then be used to tune into other facilitators paid content free of charge.</div>
                      <div>Even if you are on the frequency of opportunist you get a flat rate of 10 skills points per session when a user submits you a review.</div></p>
                    </div>  



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Facilitator;
