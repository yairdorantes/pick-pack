import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');
import { PieChart } from "echarts/charts";
import * as echarts from "echarts/core";

const Chart = () => {
  echarts.use(PieChart);
  const data = [
    { name: "16 agosto 2024", value: 6 },
    { name: "11 septiembre 2001", value: 200 },
    { name: "17 noviembre 2050", value: 100 },
    { name: "40 abril 2077", value: 400 },
  ];
  // ECharts options
  const options = {
    title: {
      text: "Pickeo",
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        // symbol: "arrow",
        // lineStyle: {
        //   type: "",
        //   // ...
        // },
      },
      //   type: "time",
      data: data.map((item) => item.name),
    },
    yAxis: {},
    series: [
      {
        type: "line",
        areaStyle: {
          color: "#1879e8",
          opacity: 0.1,
        },
        data: data.map((item) => item.value),
      },
    ],
  };

  return (
    <div>
      <h2 className="text-center">Estadísticas</h2>
      <div style={{ width: "100%", height: 290 }}>
        <ReactECharts option={options} />
      </div>
    </div>
  );
};

export default Chart;
