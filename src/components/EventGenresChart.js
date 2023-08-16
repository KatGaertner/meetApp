import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  LabelList,
  Legend,
  Title,
} from "recharts";

const EventGenresChart = ({ events, isLoading }) => {
  const [data, setData] = useState([]);

  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
  const COLORS = ["#0fb5af", "#4147cb", "#f78511", "#df3d83", "#7f85fb"];

  const nonZero = (data) =>
    data.filter((genre) => genre.value > 0).map((el) => el.name);

  const sumEvents = (data) =>
    data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0
    );

  const percent = (value, data) =>
    ((value / sumEvents(data)) * 100).toFixed(0).toString() + "%";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{ borderColor: payload[0].payload.fill }}
        >
          <p className="label">{payload[0].name}</p>
          <p>
            {percent(payload[0].value, data)} ({payload[0].value}{" "}
            {payload[0].value === 1 ? " event" : " events"})
          </p>
        </div>
      );
    }
  };

  const customPercentage = (cellData) => {
    if (nonZero(data).includes(cellData.name)) {
      return percent(cellData.value, data);
    }
    return null;
  };

  const customLabel = (piePiece) => {
    if (nonZero(data).includes(piePiece.name)) {
      return piePiece.name;
    }
    return null;
  };

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    return data;
  };

  useEffect(() => {
    setData(getData());
  }, [`${data}`, events]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart margin={{ top: 35, left: 5, right: 5, bottom: 60 }}>
        {isLoading ? null : (
          <>
            <Legend layout="horizontal" verticalAlign="bottom" />
            <text
              x="50%"
              y="0"
              dy={25}
              style={{ fontSize: 16, fontWeight: "bold" }}
              textAnchor="middle"
            >
              Event Topics
            </text>
          </>
        )}

        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={customLabel}
          outerRadius={100}
          isAnimationActive={false}
        >
          <LabelList fill="white" dataKey={customPercentage} stroke="none" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          isAnimationActive={false}
          content={<CustomTooltip />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
