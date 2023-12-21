"use client";
import Section from "@/templates/Section";
import TableTemplate from "@/templates/TableTemplate";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import urls from "@/public/data/urls.json";
import MembersManagementTable from "./MembersManagementTable";

const MembersManagement = () => {
  const tableHead = ["اسم المستخدم", "تعديل", "حذف"];
  const [tableRows, setTableRows] = useState([]);
  const url = urls.members;
  const registerUrl = urls.register;
  const [resMsg, setResMsg] = React.useState(null);

  // Handle modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResMsg(null);
  };

  // Get data
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setTableRows(res.data);
      })
      .catch((err) =>
        alert(
          "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من اتصالك بالانترنت"
        )
      );
  }, [url]);

  // Add a new project
  const add = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData);
    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setTableRows((prev) => [...prev, res.data]);
      })
      .finally(event.currentTarget.reset())
      .catch((err) => {
        alert(
          "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التحقق من صحة البيانات والمحاولة مرة أخرى"
        );
      });
  };

  // Show
  const [shown, setShown] = useState(null);
  const show = (row) => {
    setShown(row);
  };

  // Update
  const update = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    axios
      .post(`${url}/${shown.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        axios
          .get(url)
          .then((res) => {
            setTableRows(res.data);
          })
          .finally(() => {
            setResMsg("تم التعديل بنجاح.");
          })
          .catch((err) =>
            alert(
              "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من صحة البيانات المدخلة او اتصالك بالانترنت"
            )
          );
      });
  };

  // Destroy
  const destroy = (id) => {
    axios.delete(`${url}/${id}`);
    const updatedRows = tableRows.filter((e) => e.id !== id);
    setTableRows(updatedRows);
  };

  // Form control
  const [state, setState] = React.useState({
    manage_pages: false,
    manage_contracts: false,
    create_contract: false,
    manage_promocodes: false,
    manage_members: false,
    view_reports: false,
    view_mail: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    manage_pages,
    manage_contracts,
    create_contract,
    manage_promocodes,
    manage_members,
    view_reports,
    view_mail,
  } = state;

  return (
    <Section>
      <Typography variant="h4" py={3}>
        اضافة عضو جديد
      </Typography>
      <form onSubmit={add}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <TextField
              name="username"
              variant="standard"
              label="اسم المستخدم"
              sx={{ width: 400 }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="password"
              type="password"
              variant="standard"
              label="كلمة السر"
              sx={{ width: 400 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">الصلاحيات</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="manage_pages" />}
              label="ادارة صفحات الموقع"
              checked={manage_pages}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="manage_contracts" />}
              label="ادارة العقود"
              checked={manage_contracts}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="create_contract" />}
              label="اضافة عقد جديد"
              checked={create_contract}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="manage_promocodes" />}
              label="ادارة كوبونات الخصم"
              checked={manage_promocodes}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="manage_members" />}
              label="ادارة اﻻعضاء"
              checked={manage_members}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="view_reports" />}
              label="الاطلاع على التقارير"
              checked={view_reports}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="view_mail" />}
              label="الاطلاع على الرسائل"
              checked={view_mail}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              اضافة عضو جديد
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box pt={5} pb={10}>
        <MembersManagementTable
          show={show}
          update={update}
          destroy={destroy}
          shown={shown}
          tableHead={tableHead}
          tableRows={tableRows}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          resMsg={resMsg}
        />
      </Box>
    </Section>
  );
};

export default MembersManagement;
