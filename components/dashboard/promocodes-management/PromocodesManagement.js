"use client";
import Section from "@/templates/Section";
import TableTemplate from "@/templates/TableTemplate";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import urls from "@/public/data/urls.json";
import PromocodesManagementTable from "./PromocodesManagementTable";

const PromocodesManagement = () => {
  const tableHead = [
    "كوبون الخصم",
    "نسبة الخصم %",
    "تاريخ البداية",
    "تاريخ الانتهاء",
    "تعديل",
    "حذف",
  ];
  const [tableRows, setTableRows] = useState([]);
  const url = urls.promocodes;
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
      .catch((err) =>
        alert(
          "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من صحة البيانات المدخلة او اتصالك بالانترنت"
        )
      )
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
        اضافة كوبون خصم جديد
      </Typography>
      <form onSubmit={add}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              name="promocode"
              label="كوبون الخصم"
              sx={{ width: 400 }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              name="discount"
              label="نسبة الخصم %"
              sx={{ width: 400 }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              type="date"
              name="start_date"
              label="تاريخ البداية"
              sx={{ width: 400 }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              name="expiry_date"
              type="date"
              label="تاريخ الانتهاء"
              sx={{ width: 400 }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              اضافة كوبون الخصم
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box pt={5} pb={10}>
        <PromocodesManagementTable
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

export default PromocodesManagement;
