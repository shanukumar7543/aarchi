import React from "react";
// import Button from "@mui/material";
import { Button } from "@mui/material";
import "./styles.scss";

export default function Index(props) {
  let openLinkHandler = (url) => {
    window.open(url);
  };

  return (
    <div
      className="gradient-border"
      style={{
        marginTop: "30px",
        height: "410px",
        border: "3px solid transparent",
        display: "flex",
        justifyContent: "space-between",
        padding: "12px",
        // overflowY: "auto",
      }}
    >
      <div
        className="carousel-img"
        style={{
          width: "60%",
          border: "2px solid transparent",
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <img
          style={{ borderRadius: "20px" }}
          src={props.cardDetails.image}
          height="100%"
          width="100%"
          alt="Loading"
        />
      </div>

      <div
        style={{
          width: "40%",
          color: "rgb(175,133,243)",
          overflowY: "auto",
          margin: "5px 8px 8px 5px",
        }}
        className="px-4 carousel-txt"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: props.cardDetails.wysiwyg_editor,
          }}
        />

        {props.cardDetails.is_button1 && (
          <Button
            onClick={() => {
              openLinkHandler(props.cardDetails.btn1_link);
            }}
            style={{
              background: "rgb(56,182,255)",
              width: "100%",
              color: "white",
            }}
          >
            <span style={{ float: "right" }}>
              {props.cardDetails.btn1_text
                ? props.cardDetails.btn1_text
                : "USDT"}
            </span>
          </Button>
        )}

        <br />
        {props.cardDetails.is_button2 && (
          <Button
            onClick={() => {
              openLinkHandler(props.cardDetails.btn1_link);
            }}
            style={{
              marginTop: "10px",
              background: "rgb(56,182,255)",
              width: "100%",
              // marginBottom: "10px",
              color: "white",
            }}
          >
            <span style={{ float: "right" }}>
              {props.cardDetails.btn2_text
                ? props.cardDetails.btn2_text
                : "UTOPIA"}
            </span>
          </Button>
        )}

        <br />
        {props.cardDetails.is_button3 && (
          <Button
            onClick={() => {
              openLinkHandler(props.cardDetails.btn3_link);
            }}
            style={{
              marginTop: "10px",
              background: "red",
              width: "100%",
              marginBottom: "15px",
              color: "white",
            }}
          >
            {props.cardDetails.btn3_text
              ? props.cardDetails.btn3_text
              : "BUY NOW"}
          </Button>
        )}
      </div>
    </div>
  );
}
