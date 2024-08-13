/**
 * Series data for IOPS chart
 */
export const iopsSeries = [
  { key: "checkpoint_write_time", color: "#8884d8" },
  { key: "checkpoint_sync_time", color: "#82ca9d" },
];

/**
 * Series data for Throughput chart
 */
export const throughputSeries = [
  { key: "active_connections", color: "#8884d8" },
  { key: "transactions_committed", color: "#82ca9d" },
  { key: "transactions_rolled_back", color: "#ffc658" },
];

/**
 * Interface for IOPS data
 *
 * @interface IOPSData
 * @property {string} timestamp - Timestamp of the data point
 * @property {number} checkpoint_write_time - Checkpoint write time
 * @property {number} checkpoint_sync_time - Checkpoint sync time
 */
export interface IOPSData {
  timestamp: string;
  checkpoint_write_time: number;
  checkpoint_sync_time: number;
}

/**
 * Interface for Throughput data
 *
 * @interface ThroughputData
 * @property {string} timestamp - Timestamp of the data point
 * @property {string} active_connections - Active connections
 * @property {string} transactions_committed - Transactions committed
 * @property {string} transactions_rolled_back - Transactions rolled back
 */
export interface ThroughputData {
  timestamp: string;
  active_connections: string;
  transactions_committed: string;
  transactions_rolled_back: string;
}

export interface DataPoint {
  [key: string]: number | string;
}

export interface LiveChartProps {
  data: DataPoint[];
  xaxisKey: string;
  series: { key: string; color: string }[];
  title: string;
  width?: number;
  height?: number;
}

export interface CustomLabelProps {
  x: number;
  y: number;
  readValue: number;
  writeValue: number;
}
