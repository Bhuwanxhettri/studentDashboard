import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const HitMaps = () => {
  const [state, setstate] = useState({
    options: {
      chart: {
        type: "heatmap",
      },
    },
    series: [
      {
        name: "Series 1",
        data: [
          { x: "Monday", y: 0, value: 4 },
          { x: "Tuesday", y: 1, value: 6 },
          { x: "Wednesday", y: 2, value: 2 },
          { x: "Thursday", y: 3, value: 8 },
          { x: "Friday", y: 4, value: 3 },
          { x: "Saturday", y: 5, value: 1 },
          { x: "Sunday", y: 6, value: 5 },
        ],
      },
    ],
  });

  return (
    <>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="heatmap"
        height={250}
      />
    </>
  );
};

export default HitMaps;
