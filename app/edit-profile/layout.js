"use client"
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {Box} from "@mui/material";

export default function EditProfileLayout({ children }) {
  return (
    <>
      <Navbar />
        <main id={"main"}>
            <Box py={5}>
              {children}
            </Box>
        </main>
      <Footer />
    </>
  );
}
