"use client";
import Section from "@/templates/Section";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import urls from "@/public/data/urls";
import InterestedMessagesTable from "./InterestedMessagesTable";

const InterestedMessages = () => {
  const tableHead = [
    "اسم المرسل",
    "البريد الالكتروني",
    "رقم الجوال",
    "اسم الشركة",
    "نوع الشركة",
    "حجم الشركة ",
    "الرسالة",
    "حذف",
  ];
  const [tableRows, setTableRows] = useState([]);
  const url = urls.interested_messages;

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

  const show = (id) => {
    axios.get(`${url}/${id}`).then((res) => setShown(res.data));
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
      <Typography variant="h4">رسائل المهتمين</Typography>
      <Box pt={5} pb={10}>
        <InterestedMessagesTable
          show={show}
          update={update}
          destroy={destroy}
          tableHead={tableHead}
          tableRows={tableRows}
          shown={shown}
        />
      </Box>
    </Section>
  );
};

export default InterestedMessages;
