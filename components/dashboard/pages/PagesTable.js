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
  FormControl,
  Grid,
  MenuItem,
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
  width: 400,
  maxHeight: "90vh",
  overFlow: "scroll",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  direction: "rtl",
};

export default function PagesTable({
  tableHead,
  tableRows,
  show,
  update,
  destroy,
  shown,
  navElements,
  navElement,
  handleChange,
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
                  {row.title_ar}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.title_en}
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
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={update}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    select
                    variant="standard"
                    label="اسم العنصر المراد اضافة الصفحة اليه"
                    value={navElement}
                    onChange={handleChange}
                    name="nav_ele_id"
                    defaultValue={shown?.nav_ele_id}
                    fullWidth
                    required
                  >
                    {navElements.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.title_ar}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    label="اسم الصفحة باللغة العربية"
                    name="title_ar"
                    defaultValue={shown?.title_ar}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    label="اسم الصفحة باللغة الانجليزية"
                    fullWidth
                    name="title_en"
                    defaultValue={shown?.title_en}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    label="رابط الصفحة"
                    fullWidth
                    name="slug"
                    defaultValue={shown?.slug}
                    required
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
                    تعديل الصفحة{" "}
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
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
