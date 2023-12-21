"use client";
import Section from "@/templates/Section";
import TableTemplate from "@/templates/TableTemplate";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import urls from "@/public/data/urls.json";
import NavbarElementsTable from "./NavbarElementsTable";
import { useRouter } from "next/navigation";

const NavbarElements = () => {
  const tableHead = [
    "اسم العنصر باللغة العربية",
    "اسم العنصر باللغة الانجليزية",
    "تعديل",
    "حذف",
  ];
  const [tableRows, setTableRows] = useState([]);
  const url = urls.nav_elements;
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
      .catch((err) =>
        alert(
          "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من صحة البيانات المدخلة او اتصالك بالانترنت"
        )
      );
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

  return (
    <Section>
      <Typography variant="h4" py={3}>
        اضافة عنصر لشريط التنقل
      </Typography>
      <form onSubmit={add}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              name="title_ar"
              label="اسم العنصر المراد اضافته باللغة العربية"
              sx={{ width: 400 }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="title_en"
              variant="standard"
              label="اسم العنصر المراد اضافته باللغة الانجليزية"
              sx={{ width: 400 }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              اضافة عنصر جديد
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box pt={5} pb={10}>
        <NavbarElementsTable
          show={show}
          update={update}
          destroy={destroy}
          tableHead={tableHead}
          tableRows={tableRows}
          shown={shown}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          resMsg={resMsg}
        />
      </Box>
    </Section>
  );
};

export default NavbarElements;
