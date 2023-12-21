"use client";
import React, { useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountMenu from "./AccountMenu";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/sidebarSlice";
import Link from "next/link";
import axios from "axios";
import {
  loginUser,
  setID,
  setProfilePic,
  setUsername,
  toggleCreateContract,
  toggleManageContracts,
  toggleManageMembers,
  toggleManagePages,
  toggleManagePromocodes,
  toggleViewMail,
  toggleViewReports,
} from "@/store/userSlice";
import urls from "@/public/data/urls.json";

const Navbar = () => {
  const dispatch = useDispatch();
  const userID =
    typeof window !== "undefined" && localStorage.getItem("userID");
  const url = urls.members;
  useEffect(() => {
    axios
      .get(`${url}/${userID}`)
      .then((res) => {
        dispatch(loginUser());
        dispatch(setID(res.data.id));
        dispatch(setUsername(res.data.username));
        res.data.profile_pic && dispatch(setProfilePic(res.data.profile_pic));
        res.data.create_contract === "on" && dispatch(toggleCreateContract());
        res.data.manage_contracts === "on" && dispatch(toggleManageContracts());
        res.data.manage_pages === "on" && dispatch(toggleManagePages());
        res.data.manage_members === "on" && dispatch(toggleManageMembers());
        res.data.manage_promocodes === "on" &&
          dispatch(toggleManagePromocodes());
        res.data.view_reports === "on" && dispatch(toggleViewReports());
        res.data.view_mail === "on" && dispatch(toggleViewMail());
      })
      .catch((err) => alert("هناك خطأ فى الاتصال بقاعدة البيانات"));
  }, []);

  return (
    <nav>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        height={"100%"}
        borderBottom={"1px solid white"}
        bgcolor={"#010e28"}
      >
        <Container>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={{ xs: "flex", sm: "flex", md: "none" }}>
              <Button
                sx={{ color: "white" }}
                onClick={() => dispatch(toggleSidebar())}
              >
                <MenuIcon fontSize="large" />
              </Button>
            </Box>
            <Link href={"/dashboard"}>
              <Box p={1} borderRadius={2}>
                <img src="/images/logo.png" alt="Logo" width={30} height={30} />
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

export default Navbar;
