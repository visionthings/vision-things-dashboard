import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import HomeBoxes from "./home-boxes/HomeBoxes";
import Operations from "./operations/Operations";
import SalesReport from "./sales-report/SalesReport";
import VisitsReport from "./visits-report/VisitsReport";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  return (
    <Box minHeight={"100vh"} id={"dashboard-home"}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <HomeBoxes />
        </Grid>
        <Grid item xs={12}>
          <Operations />
        </Grid>
        <Grid item xs={12}>
          <SalesReport />
        </Grid>
        <Grid item xs={12}>
          <VisitsReport />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
