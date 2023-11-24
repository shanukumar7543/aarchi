import React from "react";
import "./style.scss";

export default function Index(props) {
  return (
    // <Grid container spacing={1} sx={{ marginLeft: "20px" }}>
    //   <Grid item xs={12}>
    <div style={{ marginTop: "20px" }}>
      {props.data.map((cardDetails, index) => {
        return (
          <button
            className={
              props.index === index ? "btn-style selected" : "btn-style"
            }
            style={{ width: 140 }}
            onClick={() => {
              props.setIndex(index);
              props.onClick();
            }}
          >
            {cardDetails.category}
          </button>
        );
      })}
    </div>
  );
}
