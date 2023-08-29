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
  ms_extra: number;
}

export default function Graph(props: { data: TimeSery[] | undefined }) {
  const data = props.data;
  const refLine = 6;

  const graphData: GraphData[] = [];
  data?.map((t, index) => {
    t.parameters?.map((p, index) => {
      if (p.name === "ws") {
        if (p.values[0] > refLine) {
          graphData.push({
            time: date.format(new Date(t.validTime), "hh:mm"),
            ms: refLine,
            ms_extra: Number((p.values[0] - refLine).toFixed(4)),
            
          });
          console.log(p.values[0] - refLine);
        } else {
          graphData.push({
            time: date.format(new Date(t.validTime), "hh:mm"),
            ms: p.values[0],
            ms_extra: 0,
          });
          console.log("0");
        }
        
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
         <ReferenceLine
          y={refLine}
          stroke="none"
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
          domain={["dataMin", "dataMax"]}
        />

        <Area
          type="monotone"
          dataKey="ms"
          stroke="none"
          fill="#56bb80"
          stackId="1"
          animationDuration={1000}
        />
        <Area
          type="monotone"
          dataKey="ms_extra"
          stroke="none"
          fill="#ed8d25"
          stackId="1"
          animationDuration={1000}
        />
        
      </AreaChart>
    </ResponsiveContainer>
  );
}
