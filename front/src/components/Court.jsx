import React from "react";
import IMAGE from "../assets/court.jpeg";
import AREAS from "./Areas";
import Area from "./Area";

const Court = ({ setArea }) => {
  return (
    <svg
      viewBox="-40 -25 1024 649"
      xmlns="http://www.w3.org/2000/svg"
      // className="lg:rotate-0 rotate-90"
    >
      <image width="935" height="568" x="2.554" y="6.504" href={IMAGE} />
      {AREAS.map(({ id, ...area }) => (
        <Area key={id} id={id} {...area} onClick={(id) => setArea(id)} />
      ))}
    </svg>
  );
};

export default Court;
