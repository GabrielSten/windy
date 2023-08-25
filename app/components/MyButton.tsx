"use client";

import { places } from "../conf";
import { parseSwe } from "../utils";

async function getData(placeName: string) {
  const placeData = places.find(
    (element) => parseSwe(element.name) === placeName
  );

  try {
    const res = await fetch(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${placeData?.longitude}/lat/${placeData?.latitude}/data.json`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("error: " + e);
    return { e };
  }
}

export default function MyButton() {
  async function handleClick() {
    const data = await getData("gothenburg");
    /* console.log(data); */
  }
  return (
    <>
      <button onClick={handleClick}>GET DATA</button>
    </>
  );
}
