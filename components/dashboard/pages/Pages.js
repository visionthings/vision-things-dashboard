"use client";
import Section from "@/templates/Section";
import TableTemplate from "@/templates/TableTemplate";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PagesTable from "./PagesTable";
import urls from "@/public/data/urls.json";
import axios from "axios";

const Pages = () => {
  const tableHead = [
    "اسم الصفحة باللغة العربية",
    "اسم الصفحة باللغة الانجليزية",
    "تعديل",
    "حذف",
  ];
  const [tableRows, setTableRows] = useState([]);
  const url = urls.pages;
  const navElementsUrl = urls.nav_elements;
  const [navElements, setNavElements] = useState([]);
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
          "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من صحة البيانات المدخلة او اتصالك بالانترنت"
        )
      );
    axios
      .get(navElementsUrl)
      .then((res) => {
        setNavElements(res.data);
      })
      .catch((err) =>
        alert(
          "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من صحة البيانات المدخلة او اتصالك بالانترنت"
        )
      );
  }, [url, navElementsUrl]);

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
        console.log(data);
        setTableRows((prev) => [...prev, res.data]);
      })
      .finally(event.currentTarget.reset());
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
              "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من اتصالك بالانترنت"
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

  // Form
  const [navElement, setNavElement] = React.useState("");

  const handleChange = (event) => {
    setNavElement(event.target.value);
  };
  return (
    <Section>
      <Typography variant="h4" py={3}>
        اضافة صفحة جديدة
      </Typography>
      <form onSubmit={add}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              select
              variant="standard"
              label="اسم العنصر المراد اضافة الصفحة اليه"
              sx={{ width: 400 }}
              value={navElement}
              onChange={handleChange}
              name="nav_ele_id"
              required
            >
              {navElements.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.title_ar}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="اسم الصفحة باللغة العربية"
              sx={{ width: 400 }}
              name="title_ar"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="اسم الصفحة باللغة الانجليزية"
              sx={{ width: 400 }}
              name="title_en"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              label="رابط الصفحة"
              sx={{ width: 400 }}
              name="slug"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              اضافة صفحة جديدة
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box pt={5} pb={10}>
        <PagesTable
          show={show}
          update={update}
          destroy={destroy}
          tableHead={tableHead}
          tableRows={tableRows}
          shown={shown}
          navElements={navElements}
          navElement={navElement}
          handleChange={handleChange}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          resMsg={resMsg}
        />
      </Box>
    </Section>
  );
};

export default Pages;
