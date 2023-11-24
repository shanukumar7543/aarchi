import React from "react";
import "./style.scss";
function Index(props) {
  return (
    <textarea
      type="text"
      rows={6}
      {...props}
      className={`MVP-InputField ${props.className}`}
    />
  );
}

export default Index;
