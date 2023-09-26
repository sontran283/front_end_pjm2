import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import axios from "axios";

export default function Slider() {
  const [slider, setSlider] = useState([]);

  const contentStyle = {
    height: "calc(100vh - 134px)",
    color: "#fff",
    lineHeight: "100px",
    textAlign: "center",
    background: "#364d79",
  };

  useEffect(() => {
    axios
      .get("http://localhost:1997/slider")
      .then((response) => setSlider(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Carousel autoplay={true}>
        {slider.map((sli) => (
          <div key={sli.img}>
            <div style={contentStyle} >
              <img src={sli.img} alt="" className="block w-full" />
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
