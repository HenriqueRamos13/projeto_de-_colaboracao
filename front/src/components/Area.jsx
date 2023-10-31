import React, { useState } from "react";

const Area = ({ id, onClick, type, ...data }) => {
  const [hover, setHover] = useState(false);

  const commonProps = {
    fill: hover ? "#0000FF40" : "rgba(0, 0, 0, 0)",
    stroke: "#00000070",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onClick && onClick(id),
  };

  const element = React.createElement(type, {
    ...data,
    ...commonProps,
  });

  return element;
};

export default Area;
