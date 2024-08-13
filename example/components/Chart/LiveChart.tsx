// components/LiveChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomGrid from "./CustomGrid";
import CustomLabel from "./CustomLabel";
import { LiveChartProps } from "utils/demo/chartsData";

const LiveChart: React.FC<LiveChartProps> = ({
  data,
  series,
  title,
  width = 500,
  height = 250,
}) => {
  const calculateAverage = (key: string) => {
    const values = data.map((point) => point[key] as number);
    const avg = values.reduce((acc, val) => acc + val, 0) / values.length;
    console.log("values", avg);
    return avg;
  };

  const readValue = calculateAverage(series[0].key); // First series
  const writeValue = calculateAverage(series[1].key); // Second series

  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CustomGrid height={height} width={width} />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
            />
          ))}
          <CustomLabel
            x={width / 2}
            y={height / 2}
            readValue={readValue}
            writeValue={writeValue}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;
