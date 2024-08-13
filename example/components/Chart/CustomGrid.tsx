import React from "react";

interface CustomGridProps {
  height: number;
  width: number;
}

const CustomGrid: React.FC<CustomGridProps> = ({ height, width }) => {
  const numberOfLines = Math.floor(height / 50);

  return (
    <svg width={width} height={height} className="recharts-cartesian-grid">
      {Array.from({ length: numberOfLines }, (_, index) => index * 50).map(
        (y) => (
          <line
            key={y}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke="#f0f0f0"
            strokeWidth={1}
          />
        )
      )}
    </svg>
  );
};

export default CustomGrid;
