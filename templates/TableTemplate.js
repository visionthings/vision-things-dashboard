"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const TableTemplate = ({ title, rows, columns }) => {
  return (
    <Box
      sx={{
        height: "200px",
        width: "100%",
        backgroundColor: "white",
        direction: "ltr",
      }}
    >
      <Typography variant="h4" textAlign={"center"} mb={5}>
        {title}
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
        checkboxSelection
      />
    </Box>
  );
};

export default TableTemplate;
