import React from "react";
import "./style.scss";
function Index(props) {
  return (
    <select {...props} className={`MVP-InputField ${props.className}`}>
      <>
        <option value={""}>{props.placeholder}</option>
        {props.children}
      </>
    </select>
  );
}

export default Index;
