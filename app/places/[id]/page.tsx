import { SMHIdata, SortedTime, TimeSery } from "../../types";
import NavBar from "@/app/components/NavBar";
import { parseSwe } from "@/app/utils";
import { places } from "@/app/conf";
import date from "date-and-time";
import MyButton from "@/app/components/MyButton";
import Graph from "@/app/components/Graph";

async function getData(placeName: string) {
  const placeData = places.find(
    (element) => parseSwe(element.name) === placeName
  );

  try {
    const res = await fetch(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${placeData?.longitude}/lat/${placeData?.latitude}/data.json`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("error: " + e);
    return { e };
  }
}

export default async function Place({ params }: { params: { id: string } }) {
  const id = params.id;
  const data: SMHIdata = await getData(params.id);

  const days: String[][] = [];
  const sortedTime: SortedTime[] = [];
  data.timeSeries.map((stamp) => {
    const now = new Date();
    const validTime = new Date(stamp.validTime);
    const weekDay: string = date.format(validTime, "ddd");

    /* data.timeSeries.map((s, index) => {
      const vT = new Date(s.validTime);
      if (
        date.format(validTime, "YYYY/MM/DD") === date.format(vT, "YYY/MM/DD")
      ) {
        dayTimeSeries.push(s);
      }
    }); */

    if (
      sortedTime[sortedTime.length - 1]?.weekDay != weekDay &&
      validTime > now
    ) {
      const dayTimeSeries: SortedTime["timeSeries"] = [];
      data.timeSeries.map((s, index) => {
        const vT = new Date(s.validTime);

        if (
          date.format(validTime, "YYYY/MM/DD") === date.format(vT, "YYYY/MM/DD")
        ) {
          dayTimeSeries.push(s);
        }
      });
      sortedTime.push({
        weekDay: weekDay,
        weekDayDate: validTime,
        timeSeries: dayTimeSeries,
      });
    }

    /* days.push(date.format(time, "ddd")); */
  });

  return (
    <main className="bg-bg dark:bg-dark-bg">
      <NavBar />
      <div className="flex flex-col divide-y divide-divide px-6">
        {sortedTime.map(({ weekDay, weekDayDate, timeSeries }, index) => {
          return (
            <div
              key={index + "_weekday"}
              className="h-32 w-full items-center flex flex-row "
            >
              <div className="text-xs text-orange flex-none w-8">{weekDay}</div>
              <div className="text-xs text-orange flex-none w-8">
                {date.format(weekDayDate, "D/M")}
              </div>
              <div className="w-full h-full">
                <Graph data={timeSeries} />
              </div>
            </div>
          );
        })}
        <MyButton />
      </div>
      {id} page
    </main>
  );
}
