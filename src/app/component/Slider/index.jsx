import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselCard from "../CarouselCard";
import Buttons from "../../component/Buttons";
import "./styles.scss";

function Index(props) {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (data.length > 0 && data[index]) {
      props.setSelectedCard(data[index]);
    }
  }, [index]);

  React.useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("form_details"));
    if (localData && localData.length > 0) {
      setData(localData);
      console.log("click", click);
    }
  }, []);
  const handleSelect = (selectedIndex, e) => {
    if (!click) {
      setIndex(selectedIndex);
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        height: "450px",
        width: "100%",
        marginBottom: "70px",
      }}
    >
      <Buttons
        onClick={() => {
          setClick(true);
          console.log("2222");
        }}
        data={data}
        index={index}
        setIndex={setIndex}
      />
      <div style={{ marginLeft: "5px", marginBottom: "20px" }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {data.map((element, key) => {
            return (
              <Carousel.Item>
                <CarouselCard cardDetails={element} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Index;

// import React, { useState } from "react";
// import Carousel from "react-material-ui-carousel";
// import { Paper, Button } from "@mui/material";
// import { useEffect } from "react";

// function Index(props) {
//   const [SliderData, setSliderData] = useState([]);

//   useEffect(() => {
//     let Slider = localStorage.getItem("form_details");
//     JSON.parse(Slider);
//     setSliderData([Slider]);
//   }, []);

//   return (
//     <Carousel>
//       {SliderData.map((item, i) => (
//         <Item key={i} item={item} />
//       ))}
//     </Carousel>
//   );
// }

// function Item(props) {
//   return (
//     <Paper>
//       <h2>{props.item.id}</h2>
//       <p>{props.item.titel}</p>

//       <Button className="CheckButton">Check it out!</Button>
//     </Paper>
//   );
// }

// export default Index;
