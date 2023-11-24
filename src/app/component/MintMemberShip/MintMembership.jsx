import React from "react";
import sync from "../../../assets/images/sync.svg";
import HORSE from "../../../assets/images/horse.jpg";
import "./MintMembership.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function MintMemberShip() {
  return (
    <>
      <div className="wallet_block">
        <div className="close-icon">
          <i className="fa fa-times"></i>
        </div>
        <div className="form_block">
          <p className="member">
            Please enter your dreams and interests below to mint your limited
            edition membership NFT
          </p>
          <form>
            <label htmlFor="dreams">Your Dreams: </label>
            <div className="form-group">
              <textarea
                id="dreams"
                className="form-control"
                rows="3"
              ></textarea>
            </div>

            <label htmlFor="interests">Your Interests: </label>
            <div className="form-group">
              <textarea
                id="interests"
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            <label htmlFor="customFile"> Upload reference image: </label>
            <div className="custom-file form-group">
              <input
                style={{ display: "none" }}
                type="file"
                className="custom-file-input"
                id="customFile"
              />
              <label className="custom-file-label" htmlFor="customFile"></label>
            </div>
            <div>
              <button className="mint_profile">
                MINT YOUR MEMBERSHIP <br />
                PROFILE NFT
              </button>
            </div>
          </form>
        </div>

        <div className="image_block">
          <div className="row no-gutters">
            <div className="col-6 images">
              <figure className="image_cap">
                <img src="" alt="1" />
              </figure>
            </div>
            <div className="col-6 images">
              <figure className="image_cap">
                <img src="" alt="2" />
              </figure>
            </div>
            <div className="col-6 images">
              <figure className="image_cap">
                <img src="" alt="3" />
              </figure>
            </div>
            <div className="col-6 images">
              <figure className="image_cap">
                <img src="" alt="4" />
              </figure>
            </div>
          </div>
          <div className="row">
            <div className="col-12 block-below">
              <ul>
                <li>U1</li>
                <li>U2</li>
                <li>U3</li>
                <li>U4</li>
                <li className="blue">
                  <img style={{ width: "16px" }} src={sync} alt="sync" />
                </li>
              </ul>
              <ul className="v_block">
                <li>v1</li>
                <li>v2</li>
                <li>v3</li>
                <li>v4</li>
              </ul>
              <p className="para">
                Please choose one of the four images above to mint your NFT
              </p>
              <p className="para">
                If you don’t like that was generated go back, edit your dreams
                and interests and try agian!
              </p>
            </div>
          </div>
        </div>
        <div className="wait_block">
          <p className="text-center">
            Please wait while we manifest your future Abundance!
          </p>
          <figure className="wait_image">
            <img src={HORSE} alt="horse" />
          </figure>
        </div>
      </div>
    </>
  );
}

export default MintMemberShip;
