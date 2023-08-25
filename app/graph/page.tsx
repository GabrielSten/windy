import Graph from "../components/Graph";
import GraphBig from "./GraphBig";

const data = [
  {
    weekDay: "Fri",
    weekDayDate: new Date("2023-08-04T14:00:00.000Z"),
    timeSeries: [
      { validTime: new Date("2023-08-03T22:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-03T23:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T00:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T01:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T02:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T03:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T04:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T05:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T06:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T07:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T08:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T09:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T10:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T11:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T12:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T13:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T14:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T15:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T16:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T17:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T18:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T19:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T20:00:00Z"), parameters: [Array] },
      { validTime: new Date("2023-08-04T21:00:00Z"), parameters: [Array] },
    ],
  },
];

const data1 = [
  { name: "Page A", uv: 0, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 500, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 0, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 500, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 0, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 500, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 0, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 500, pv: 2400, amt: 2400 },
];

const data2 = [
  {
    time: "02:00",
    ms: 8.6,
  },
  {
    time: "08:00",
    ms: 7.8,
  },
  {
    time: "02:00",
    ms: 7.9,
  },
];

export default async function GraphPage() {
  return (
    <div className="h-60">
      <Graph data={data1} />
    </div>
  );
}
