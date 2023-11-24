import React from "react";
import "./style.scss";
function Index(props) {
  return (
    <input
      type="text"
      {...props}
      className={`MVP-InputField ${props.className}`}
    />
  );
}

export default Index;
