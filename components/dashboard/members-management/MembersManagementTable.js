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
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  OutlinedInput,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import urls from "@/public/data/urls.json";
import TablePagination from "@mui/material/TablePagination";
import { useSelector } from "react-redux";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  direction: "rtl",
};

export default function MembersManagementTable({
  tableHead,
  tableRows,
  show,
  update,
  destroy,
  shown,
  open,
  handleOpen,
  handleClose,
  resMsg,
}) {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

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
                  {row.username}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <EditIcon
                    color={"info"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpen();
                      show(row);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <DeleteIcon
                    color={"error"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => destroy(row.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {tableRows.length === 0 && (
          <Box py={3}>
            <Typography textAlign={"center"}>لا توجد بيانات</Typography>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            تعديل
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{
              mt: 2,
              height: "70vh",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Container>
              <form onSubmit={update}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      variant="standard"
                      label="اسم المستخدم"
                      fullWidth
                      defaultValue={shown?.username}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5">الصلاحيات</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="manage_pages"
                          defaultChecked={shown?.manage_pages === "on"}
                        />
                      }
                      label="ادارة صفحات الموقع"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="manage_contracts"
                          defaultChecked={shown?.manage_contracts === "on"}
                        />
                      }
                      label="ادارة العقود"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="create_contract"
                          defaultChecked={shown?.create_contract === "on"}
                        />
                      }
                      label="اضافة عقد جديد"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="manage_promocodes"
                          defaultChecked={shown?.manage_promocodes === "on"}
                        />
                      }
                      label="ادارة كوبونات الخصم"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="manage_members"
                          defaultChecked={shown?.manage_members === "on"}
                        />
                      }
                      label="ادارة اﻻعضاء"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="view_reports"
                          defaultChecked={shown?.view_reports === "on"}
                        />
                      }
                      label="الاطلاع على التقارير"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="view_mail"
                          defaultChecked={shown?.view_mail === "on"}
                        />
                      }
                      label="الاطلاع على الرسائل"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {resMsg !== null && (
                      <Alert severity="success">{resMsg}</Alert>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Button type="submit" variant="contained">
                      تعديل العضو{" "}
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      اغلاق
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
