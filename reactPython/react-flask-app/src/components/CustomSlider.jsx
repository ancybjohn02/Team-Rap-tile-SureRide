import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import default styles

const CustomSlider = () => {
  const [value, setValue] = useState(0);

  return (
  
    <div className="big" style={{     width: "50%",    }}>
          <h2 className="tip poppins-semibold">Extra Tip</h2>
      <h5 style={{     textAlign:"center"    }}> ₹{value}</h5>
   <div className="slid">


      <Slider 
        min={0}
        max={100}
        Rupees={value}
        onChange={(newValue) => setValue(newValue)}
        trackStyle={{ backgroundColor: "blue", height: 5 }}
        handleStyle={{ borderColor: "blue", height: 15, width: 15 }}
        railStyle={{ backgroundColor: "#ddd", height: 5 }}
        />

        </div>
        </div>
  );
};

export default CustomSlider;
