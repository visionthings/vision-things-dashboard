"use client";
import Section from "@/templates/Section";
import {Alert, Box, Button, Container, FormControl, TextField, Typography} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, {useState} from "react";
import { redirect, useRouter } from "next/navigation";
import {
  loginUser, setID, setProfilePic,
  setUsername,
  toggleCreateContract,
  toggleManageContracts, toggleManageMembers,
  toggleManagePages, toggleManagePromocodes, toggleViewReports
} from "@/store/userSlice";
import {useDispatch} from "react-redux";
import urls from "@/public/data/urls.json";

const SignIn = () => {
  const router = useRouter();
  const base_url = urls.base_url;
  const [errMsg, setErrMsg] = useState(null);
  const dispatch = useDispatch();
  const login = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    axios
      .post(`${base_url}/api/login`, data, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem('userID', res.data.username.id);
        dispatch(loginUser());
        dispatch(setID(res.data.username.id))
        dispatch(setUsername(res.data.username.username));
        res.data.username.profile_pic && dispatch(setProfilePic(res.data.username.profile_pic));
        res.data.username.create_contract === "on" && dispatch(toggleCreateContract());
        res.data.username.manage_contracts === "on" && dispatch(toggleManageContracts());
        res.data.username.manage_pages === "on" && dispatch(toggleManagePages());
        res.data.username.manage_members === 'on' && dispatch(toggleManageMembers());
        res.data.username.manage_promocodes === 'on' && dispatch(toggleManagePromocodes());
        res.data.username.view_reports === 'on' && dispatch(toggleViewReports());

        router.push("/dashboard");
      })
        .finally(event.currentTarget.reset())
      .catch((err) => setErrMsg('البيانات المدخلة غير صحيحة، برجاء التحقق من البيانات واعادة المحاولة'));
  };
  return (
    <Box
      bgcolor={"#eee"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Section>
        <Box display={"flex"} justifyContent={"center"} mb={5}>
          <Image src={"/images/logo.png"} alt={"Logo"} width={40} height={40} />
        </Box>
        <form onSubmit={login}>
          <Box width={400} mb={3} sx={{ direction: "rtl" }}>
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="username"
                label={"اسم المستخدم"}
              />
            </FormControl>
          </Box>
          <Box mb={5} sx={{ direction: "rtl" }}>
            <FormControl fullWidth>
              <TextField
                variant="standard"
                type="password"
                label={"كلمة السر"}
                name="password"
              />
            </FormControl>
          </Box>
          <Box>
          {errMsg !== null && <Alert sx={{ direction: "rtl", mb:5 }} severity={"error"}>
            <Typography>{errMsg}</Typography>
          </Alert>}</Box>
          <FormControl fullWidth>
            <Button variant="outlined" sx={{ height: 50 }} type="submit">
              الدخول
            </Button>
          </FormControl>
        </form>
      </Section>
    </Box>
  );
};

export default SignIn;
