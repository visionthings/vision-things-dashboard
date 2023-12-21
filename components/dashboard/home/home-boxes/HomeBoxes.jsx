"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RedeemIcon from "@mui/icons-material/Redeem";
import urls from "@/public/data/urls";
import axios from "axios";

const HomeBoxes = () => {
  const visitsCountUrl = `${urls.visits}/count`;
  const contractsCountUrl = `${urls.contracts}/count`;
  const [visitsCount, setVisitsCount] = useState(0);
  const [contractsCount, setContractsCount] = useState(0);

  useEffect(() => {
    axios.get(visitsCountUrl).then((res) => setVisitsCount(res.data));
    axios.get(contractsCountUrl).then((res) => setContractsCount(res.data));
  }, []);

  const items = [
    {
      id: 1,
      text: `اجمالي الايرادات: 0 ريال سعودي`,
      icon: <AttachMoneyIcon fontSize="large" />,
    },
    {
      id: 2,
      text: `عدد زيارات الموقع: ${visitsCount} زيارة`,
      icon: <VisibilityIcon fontSize="large" />,
    },
    {
      id: 3,
      text: `اجمالي عدد العقود: ${contractsCount} عقد`,
      icon: <RedeemIcon fontSize="large" />,
    },
  ];
  return (
    <Grid container spacing={5}>
      {items.map((item) => (
        <Grid item xs={12} sm={4} key={item.id}>
          <Box
            className="green-box"
            color="white"
            borderRadius={2}
            boxShadow={3}
          >
            <Container>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                py={5}
              >
                <Box>{item.icon}</Box>
                <Box pt={1}>
                  <Typography variant="h6">{item.text}</Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeBoxes;
