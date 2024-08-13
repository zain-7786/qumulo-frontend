import React, { useState, useEffect, useRef } from "react";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LiveChart from "example/components/Chart/LiveChart";
import {
  IOPSData,
  iopsSeries,
  ThroughputData,
  throughputSeries,
} from "utils/demo/chartsData";
import { Axios } from "example/components/Services/axios";

/**
 * Dashboard component that displays performance metrics charts.
 *
 * This component fetches metrics data from the server every 5 seconds and updates the charts accordingly.
 *
 * @example
 * <Dashboard />
 */
function Dashboard() {
  /**
   * Register Chart.js components
   */
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [iopsData, setIopsData] = useState<IOPSData[]>([]);
  const [throughputData, setThroughputData] = useState<ThroughputData[]>([]);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch metrics data from the server
   *
   * @async
   */
  const fetchMetrics = async () => {
    if (loading) return;

    setLoading(true);
    try {
      Axios.get("/metrics/show").then((res) => {
        const response = res.data;
        setIopsData((prevData) => [
          ...prevData,
          { timestamp: new Date().toISOString(), ...response.iops[0] },
        ]);
        setThroughputData((prevData) => [
          ...prevData,
          { timestamp: new Date().toISOString(), ...response.throughput[0] },
        ]);
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Transform data for charting
   *
   * @param {any} data - Data to transform
   * @param {any} keys - Keys to transform
   * @returns {any} Transformed data
   */
  const transformData = (data: any, keys: any) => {
    const data1 = data.map((point: any) => ({
      ...point,
      ...keys.reduce((acc: any, key: any) => {
        acc[key] = Number(point[key]) || 0; // Convert to number
        return acc;
      }, {}),
    }));

    console.log("data", data1);
    return data1;
  };

  /**
   * Initial fetch and setup polling interval
   */
  useEffect(() => {
    fetchMetrics(); // Initial fetch

    pollingIntervalRef.current = setInterval(fetchMetrics, 5000);

    // Cleanup function to clear the interval
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  return (
    <Layout>
      <PageTitle>Performance Metrics</PageTitle>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-1 h-72">
        <LiveChart
          data={transformData(iopsData, [
            "checkpoint_write_time",
            "checkpoint_sync_time",
          ])}
          xaxisKey="timestamp"
          series={iopsSeries}
          title="IOPS"
        />
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-1 h-72">
        <LiveChart
          data={transformData(throughputData, [
            "active_connections",
            "transactions_committed",
            "transactions_rolled_back",
          ])}
          xaxisKey="timestamp"
          series={throughputSeries}
          title="Throughput"
        />
      </div>
    </Layout>
  );
}

export default Dashboard;
