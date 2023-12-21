import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const size = {
  width: 500,
  height: 200,
};

export default function OperationsChart({ data }) {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "black",
          fontWeight: "bold",
        },
      }}
      {...size}
      legend={{ hidden: true }}
    />
  );
}
