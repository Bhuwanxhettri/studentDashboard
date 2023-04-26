import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const Reports = () => {
  const options = {
    chart: {
      id: "gradient-line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#77B6EA"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 90, 80],
      },
    ],
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={380}
        width={630}
      />
    </>
  );
};

export default Reports;
