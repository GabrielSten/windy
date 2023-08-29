"use client";
import * as React from "react";
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  YAxis,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { SMHIdata, SortedTime, TimeSery } from "../types";
import { useState } from "react";
import date from "date-and-time";

interface GraphData {
  time: string;
  ms: number;
}

const gradientOffset = (data: GraphData[], refLine: number) => {
  const dataMax = Math.max(...data.map((i) => i.ms));
  const dataMin = Math.min(...data.map((i) => i.ms));

  if (dataMax <= refLine) {
    return 0;
  }
  if (dataMin >= refLine) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

export default function Graph(props: { data: TimeSery[] | undefined }) {
  const data = props.data;
  const refLine = 6;

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

  const off = gradientOffset(graphData, refLine);
  console.log(off);

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
        <ReferenceLine
          y={refLine}
          stroke="#adbecb"
          strokeDasharray="3 3"
          key={"refLine"}
        />

        <YAxis
          type="number"
          hide={true}
          domain={[0, 10]}
          tick={{ fontSize: 8 }}
          axisLine={false}
          tickLine={false}
        />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 8 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#56bb80" stopOpacity={1} />
            <stop offset={off} stopColor="#ed8d25" stopOpacity={1} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="ms"
          stroke="#56bb80"
          fill="url(#splitColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
