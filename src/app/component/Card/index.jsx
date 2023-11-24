import React from "react";

function Card({
  price,
  price2,
  title,
  monthly,
  annually,
  planeList,
  wysiwyg_editor,
  buttonText,
  onClick,
  setSelectedPrice,
  selectedButton,
}) {
  return (
    <>
      <div className="plan-one">
        <h3>
          {selectedButton === 0 ? "$" + price : "$" + price2}/
          {selectedButton === 0 ? monthly : annually}
        </h3>
        <h6>{title}</h6>
        <div className="plan-details">
          <div
            dangerouslySetInnerHTML={{
              __html: wysiwyg_editor,
            }}
          />
        </div>
        <button
          className="buy-membership"
          onClick={() => {
            onClick();
            setSelectedPrice(price);
          }}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
}

export default Card;
