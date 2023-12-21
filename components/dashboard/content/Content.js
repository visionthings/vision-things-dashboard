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
import urls from "@/public/data/urls.json";
import axios from "axios";
import ContentTable from "./ContentTable";

const Content = () => {
  const tableHead = [
    "عنوان المحتوى باللغة العربية",
    "عنوان المحتوى باللغة الانجليزية",
    "المحتوى باللغة العربية",
    "المحتوى باللغة الانجليزية",
    "تعديل",
    "حذف",
  ];
  const [tableRows, setTableRows] = useState([]);
  const url = urls.contents;
  const pagesUrl = urls.pages;
  const [pages, setPages] = useState([]);
  const [resMsg, setResMsg] = React.useState(null);

  // Handle modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResMsg(null);
  };
  const [files, setFiles] = useState();
  const handleFilesChange = (event) => {
    setFiles(event.target.files);
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
    axios
      .get(pagesUrl)
      .then((res) => {
        setPages(res.data);
      })
      .catch((err) =>
        alert(
          "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من اتصالك بالانترنت"
        )
      );
  }, [url, pagesUrl]);

  // Add a new project
  const add = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (files) {
      [...files].forEach((file, i) => {
        formData.append(`file_${i + 1}`, file, file.name);
      });
    }

    const data = Object.fromEntries(formData);
    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setTableRows((prev) => [...prev, res.data]);
        console.log(data);
      })
      .finally(event.currentTarget.reset())
      .catch((err) => {
        console.log(data);
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

  // Form
  const [page, setPage] = useState("");

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  const [contentType, setContentType] = useState("");
  const handleContentChange = (event) => {
    setContentType(event.target.value);
  };
  const contentTypes = [
    { id: 1, title: "محتوى رئيسي", value: "primary" },
    { id: 2, title: "محتوى ثانوي", value: "secondary" },
    { id: 3, title: "محتوى نصي مع صورة", value: "text_with_image" },
    { id: 4, title: "محتوى نصي فقط", value: "text_only" },
    { id: 5, title: "الشركات", value: "companies" },
  ];
  return (
    <Section>
      <Typography variant="h4" py={3}>
        اضافة محتوى جديد{" "}
      </Typography>
      <form onSubmit={add}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <TextField
              select
              variant="standard"
              label="اسم الصفحة المراد اضافة المحتوى اليها"
              value={page}
              onChange={handleChange}
              name="page_id"
              fullWidth
              required
            >
              {pages.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.title_ar}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              variant="standard"
              label="طريقة عرض المحتوى بالصفحة"
              name="content_type"
              fullWidth
              value={contentType}
              onChange={handleContentChange}
              required
            >
              {contentTypes.map((e) => (
                <MenuItem key={e.id} value={e.value}>
                  {e.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              label="عنوان المحتوى باللغة العربية"
              name="title_ar"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="standard"
              label="عنوان المحتوى باللغة الانجليزية"
              name="title_en"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              multiline
              minRows={6}
              variant="standard"
              label=" المحتوى باللغة العربية"
              name="content_ar"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              multiline
              minRows={6}
              variant="standard"
              label="المحتوى باللغة الانجليزية"
              name="content_en"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <input
              type="file"
              variant="standard"
              fullWidth
              multiple
              onChange={handleFilesChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              اضافة محتوى جديد
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box pt={5} pb={10}>
        <ContentTable
          show={show}
          update={update}
          destroy={destroy}
          tableHead={tableHead}
          tableRows={tableRows}
          shown={shown}
          pages={pages}
          page={page}
          handleChange={handleChange}
          contentTypes={contentTypes}
          contentType={contentType}
          handleContentChange={handleContentChange}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          resMsg={resMsg}
        />
      </Box>
    </Section>
  );
};

export default Content;
