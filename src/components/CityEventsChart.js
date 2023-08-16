import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${data}`, events]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(/, | - /)[0];
      return { city, count };
    });
    return data;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].value}</p>
          <p>
            {payload[1].value}
            {payload[1].value === 1 ? " event" : " events"}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
        isAnimationActive={false}
      >
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 5, dy: 5, fontSize: 14 }}
          textAnchor="start"
        />
        <YAxis type="number" dataKey="count" name="Number of events" />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          isAnimationActive={false}
          content={<CustomTooltip />}
        />
        <Scatter
          name="A school"
          data={data}
          fill="#3d82c0"
          isAnimationActive={false}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
