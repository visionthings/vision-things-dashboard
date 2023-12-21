"use client";
import Section from "@/templates/Section";
import { Typography } from "@mui/material";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
} from "recharts";

const data = [
  { x: 1, y: 300, z: 40, color: "#009EF7", title: "يناير" },
  { x: 2, y: 350, z: 35, color: "#50CD89", title: "فبراير" },
  { x: 3, y: 450, z: 30, color: "#FFC700", title: "مارس" },
  { x: 4, y: 250, z: 25, color: "#F1416C", title: "ابريل" },
  { x: 5, y: 500, z: 30, color: "#7239EA", title: "مايو" },
  { x: 6, y: 250, z: 28, color: "#43CED7", title: "يونيو" },
  { x: 7, y: 700, z: 30, color: "orange", title: "يوليو" },
  { x: 8, y: 540, z: 50, color: "purple", title: "اغسطس" },
  { x: 9, y: 800, z: 40, color: "pink", title: "سبتمبر" },
  { x: 10, y: 650, z: 35, color: "yellow", title: "اكتوبر" },
  { x: 11, y: 700, z: 30, color: "green", title: "نوفمبر" },
  { x: 12, y: 900, z: 10, color: "blue", title: "ديسمبر" },
];

const SalesReport = () => {
  return (
    <Section>
      <Typography variant="h5">تقرير المبيعات الشهري</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="الشهر" />
          <YAxis type="number" dataKey="y" name="المبيعات" />
          <ZAxis
            type="number"
            dataKey="z"
            name={"الضرائب والخصومات"}
            range={[0, 5000]}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          {data.map((e, index) => (
            <Scatter key={index} name={e.title} data={[e]} fill={e.color} />
          ))}
          <Legend />
        </ScatterChart>
      </ResponsiveContainer>
    </Section>
  );
};

export default SalesReport;
