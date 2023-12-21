"use client";
import Section from "@/templates/Section";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OperationsChart from "./OperationsChart";
import CameraIcon from "@mui/icons-material/Camera";
import urls from "@/public/data/urls";
import axios from "axios";

const Operations = () => {
  const contractsCountUrl = `${urls.contracts}/count`;
  const failedPaymentsCountUrl = `${urls.failed_payments}/count`;
  const [contractsCount, setContractsCount] = useState(0);
  const [failedPaymentsCount, setFailedPaymentsCount] = useState(0);

  useEffect(() => {
    axios.get(contractsCountUrl).then((res) => setContractsCount(res.data));
    axios
      .get(failedPaymentsCountUrl)
      .then((res) => setFailedPaymentsCount(res.data));
  }, []);

  const data = [
    { value: contractsCount, label: "العمليات الناجحة", color: "#51a29d" },
    { value: failedPaymentsCount, label: "العمليات الفاشلة", color: "#ec3755" },
  ];
  const total = data[0].value + data[1].value;
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6}>
        <Section>
          <Typography variant="h6">تقرير عمليات الدفع</Typography>
          <OperationsChart data={data} />
        </Section>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          className="pink-section"
          borderRadius={2}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={3}
        >
          <CameraIcon sx={{ fontSize: "120px" }} />
          <Typography mt={2} variant="h4">
            اجمالي عدد العمليات = {total}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Operations;
