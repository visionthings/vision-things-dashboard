"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Section from "@/templates/Section";
import { Typography } from "@mui/material";

export default function VisitsReport() {
  return (
    <Section>
      <Typography variant="h5">تقارير الزيارات الشهرية</Typography>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 3, 4, 7, 4, 5, 6, 7],
            area: true,
          },
        ]}
        width={1100}
        height={300}
      />
    </Section>
  );
}
