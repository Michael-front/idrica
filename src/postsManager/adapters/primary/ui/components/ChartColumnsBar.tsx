import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export type DataChartColumnsBar = [string, number];

interface ChartColumnsBarProps {
  title: string;
  subtitle?: string;
  yAxisName: string;
  showLegend?: boolean;
  tooltipInitial: string;
  data: DataChartColumnsBar[];
}

const ChartColumnsBar = ({
  title,
  subtitle,
  yAxisName,
  showLegend = false,
  tooltipInitial,
  data,
}: ChartColumnsBarProps) => {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle || "",
    },
    xAxis: {
      type: "category",
      labels: {
        autoRotation: [-45, -90],
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxisName,
      },
    },
    legend: {
      enabled: showLegend,
    },
    tooltip: {
      pointFormat: `${tooltipInitial}: <b>{point.y:.1f} </b>`,
    },
    series: [
      {
        type: "column",
        name: "Population",
        colors: ["#737373"],
        colorByPoint: true,
        groupPadding: 0,
        data: data,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          inside: true,
          verticalAlign: "top",
          format: "{point.y:.1f}", // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartColumnsBar;
