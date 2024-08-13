import React from "react";
import { CustomLabelProps } from "utils/demo/chartsData";

const CustomLabel: React.FC<CustomLabelProps> = ({
  x,
  y,
  readValue,
  writeValue,
}) => {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ fontSize: "12px", textAnchor: "middle" }}
    >
      <rect
        x={-75}
        y={-40}
        width={150}
        height={60}
        fill="white"
        stroke="#ddd"
        strokeWidth={1}
        rx={5}
        ry={5}
      />
      <text x={-70} y={-20} fill="#000">
        Read: {readValue.toFixed(2)}
      </text>
      <text x={-70} y={0} fill="#000">
        Write: {writeValue.toFixed(2)}
      </text>
    </g>
  );
};

export default CustomLabel;
