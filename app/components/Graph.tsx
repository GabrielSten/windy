"use client";
import * as React from "react";
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  YAxis,
} from "recharts";
import { SMHIdata, SortedTime, TimeSery } from "../types";
import { useState } from "react";
import date from "date-and-time";

interface GraphData {
  time: string;
  ms: number;
}

export default function Graph(props: { data: TimeSery[] | undefined }) {
  const [start, setStart] = useState("06:00");
  const [stop, setStop] = useState("22:00");
  const data = props.data;
  const dataArray = [data];

  const graphData: GraphData[] = [];
  data?.map((t, index) => {
    t.parameters?.map((p, index) => {
      if (p.name === "ws") {
        graphData.push({
          time: date.format(new Date(t.validTime), "hh:mm"),
          ms: p.values[0],
        });
      }
    });
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={10}
        height={10}
        data={graphData}
        margin={{
          top: 1,
          right: 1,
          left: 1,
          bottom: 1,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ed8d25" stopOpacity={0.8} />
            <stop offset="0%" stopColor="#56bb80" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis
          type="number"
          hide={true}
          domain={[0, 10]}
          axisLine={false}
          tickLine={false}
        />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 8 }}
          axisLine={false}
          tickLine={false}
        />
        {/* <Tooltip /> */}
        <Area
          type="monotone"
          dataKey="ms"
          stroke="#56bb80"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
