"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material";
import AccountMenu from "@/components/navbar/AccountMenu";

import Link from "next/link";

const UserNavbar = () => {
  const theme = useTheme();
  return (
    <nav>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        height={"100%"}
        bgcolor={theme.palette.primary.main}
        borderBottom={"1px solid white"}
      >
        <Container>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Link href={"/dashboard"}>
              <Box bgcolor={"white"} p={1} borderRadius={2}>
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  width={140}
                  height={40}
                />
              </Box>
            </Link>
            <Box>
              <AccountMenu />
            </Box>
          </Box>
        </Container>
      </Box>
    </nav>
  );
};

export default UserNavbar;
