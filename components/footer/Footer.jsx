import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Typography textAlign={"center"} py={3}>
          2023 © جميع الحقوق محفوظة لشركة رؤية الأشياء
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
