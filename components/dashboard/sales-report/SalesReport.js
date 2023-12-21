"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  Grid,
  OutlinedInput,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import urls from "@/public/data/urls.json";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SalesReport() {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  // Fetch data

  const tableHead = [
    "تاريخ العملية",
    "رقم العقد",
    "اسم العميل",
    "اجمالي القيمة ",
    "المدفوع",
    "الخصم",
    "الضرائب",
    "صافي الايرادات",
  ];
  const [tableRows, setTableRows] = React.useState([]);
  const url = urls.contracts;

  // Get data
  React.useEffect(() => {
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

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHead.map((e, index) => (
                <StyledTableCell key={index} align="center">
                  {e}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableRows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.contract_date}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.contract_number}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {parseFloat(row.paid_amount).toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {parseFloat(
                    row.paid_amount - row.paid_amount * (row.discount / 100)
                  ).toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {parseFloat(row.paid_amount * (row.discount / 100)).toFixed(
                    2
                  )}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {(parseFloat(row.paid_amount) * 0.15).toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {(
                    parseFloat(row.paid_amount) -
                    (parseFloat(row.paid_amount) * 0.15 +
                      (parseFloat(row.paid_amount) * parseFloat(row.discount)) /
                        100)
                  ).toFixed(2)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {tableRows.length === 0 && (
          <Box py={3}>
            <Typography textAlign={"center"}>لا توجد مبيعات</Typography>
          </Box>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
        component="div"
        count={tableRows.length}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ direction: "ltr" }}
      />
    </Box>
  );
}
