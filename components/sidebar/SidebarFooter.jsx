import { Box, Typography } from "@mui/material";
import React from "react";
import InsertDriveFileTwoToneIcon from "@mui/icons-material/InsertDriveFileTwoTone";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import Link from "next/link";

const SidebarFooter = () => {
  const isActive = useSelector((state) => state.sidebar.isSidebarActive);

  return (
    <Box
      height={75}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Link href={"https://www.vision-things.com"} target="_blank">
        <Box bgcolor={blue[50]} borderRadius={1} p={1} whiteSpace={"nowrap"}>
          <Typography display={!isActive && "none"} px={2} color={blue[500]}>
            الذهاب إلى الموقع
          </Typography>
          <InsertDriveFileTwoToneIcon
            sx={{ color: blue[500], display: isActive && "none" }}
          />
        </Box>
      </Link>
    </Box>
  );
};

export default SidebarFooter;
