import React from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";
export default function LoadingSVG() {
  return (
    <Svg
      style={{
        margin: "auto",
        backgroundColor: "rgb(38, 36, 34)",
      }}
      width="20px"
      height="20px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <Circle
        cx={50}
        cy={50}
        fill="none"
        stroke="#ffffff"
        strokeWidth={10}
        r={35}
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          style={{ animationPlayState: "running", animationDelay: "0s" }}
        />
      </Circle>
    </Svg>
  );
}
