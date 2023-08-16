import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
  const COLORS = ["#0fb5af", "#4147cb", "#f78511", "#df3d83", "#7f85fb"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].name}</p>
          <p>
            {payload[0].value} {payload[0].value === 1 ? " event" : " events"}
          </p>
        </div>
      );
    }
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

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.1;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.1;

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${genres[index]}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    setData(getData());
  }, [`${data}`, events]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={160}
          isAnimationActive={false}
        >
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
