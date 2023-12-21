"use client";
import Section from "@/templates/Section";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import urls from "@/public/data/urls.json";
import ContractsTable from "./ContractsTable";

const ContractsManagement = () => {
  const tableHead = [
    "رقم العقد",
    "اسم المتعاقد",
    "تاريخ التعاقد",
    "تحميل نسخة PDF من العقد",
    "تعديل",
    "حذف",
  ];
  const [tableRows, setTableRows] = useState([]);
  const url = urls.contracts;

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
  return (
    <Section>
      <Typography variant="h4" textAlign={"center"}>
        جميع العقود المسجلة
      </Typography>
      <Box pt={5} pb={10}>
        <ContractsTable
          show={show}
          update={update}
          destroy={destroy}
          shown={shown}
          tableHead={tableHead}
          tableRows={tableRows}
        />
      </Box>
    </Section>
  );
};

export default ContractsManagement;
