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
  Container,
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
  width: 700,
  maxHeight: "60vh",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  direction: "rtl",
};

export default function ContentTable({
  tableHead,
  tableRows,
  show,
  update,
  destroy,
  shown,
  pages,
  page,
  handleChange,
  contentType,
  handleContentChange,
  contentTypes,
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
                <StyledTableCell component="th" scope="row" align="center">
                  {row.content_ar}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.content_en}
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
              maxHeight: 300,
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Container>
              <form onSubmit={update}>
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
                      defaultValue={shown?.page_id}
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
                      defaultValue={shown?.content_type}
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
                      defaultValue={shown?.title_ar}
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      variant="standard"
                      label="عنوان المحتوى باللغة الانجليزية"
                      name="title_en"
                      fullWidth
                      defaultValue={shown?.title_en}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="standard"
                      label=" المحتوى باللغة العربية"
                      name="content_ar"
                      fullWidth
                      defaultValue={shown?.content_ar}
                      required
                      multiline
                      minRows={6}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="standard"
                      label="المحتوى باللغة الانجليزية"
                      name="content_en"
                      fullWidth
                      defaultValue={shown?.content_en}
                      required
                      multiline
                      minRows={6}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <input
                      type="file"
                      variant="standard"
                      name="file_1"
                      fullWidth
                      multiple
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
                      تعديل المحتوى{" "}
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
