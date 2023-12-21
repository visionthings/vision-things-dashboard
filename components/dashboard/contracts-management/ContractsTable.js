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
import { useFormik } from "formik";
import * as yup from "yup";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import axios from "axios";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  name: yup.string().min(2, "الاسم قصير جدا").required("ادخل الاسم"),
  phone: yup
    .string()
    .matches(phoneRegExp, "رقم الجوال غير صالح")
    .required("ادخل رقم الجوال"),
  email: yup
    .string()
    .email("ادخل بريد الكتروني صالح")
    .required("ادخل البريد الالكتروني"),
  company_type: yup.string().required("ادخل نوع الشركة"),
  commercial_number: yup
    .string()
    .required("ادخل رقم السجل التجاري")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  tax_number: yup
    .string()
    .required("ادخل الرقم الضريبي")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  address: yup.string().required("ادخل العنوان"),
  city: yup.string().required("ادخل المدينة"),
  building_number: yup.string().required("ادخل رقم المبنى"),
  street_name: yup.string().required("ادخل اسم الشارع"),
  second_number: yup.string().required("ادخل رقم جوال آخر"),
  district: yup.string().required("ادخل الحي"),
  zip_code: yup.string().required("ادخل الرمز البريدي"),
  indoor_cameras: yup
    .string()
    .required("ادخل عدد الكاميرات الداخلية")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  outdoor_cameras: yup
    .string()
    .required("ادخل عدد الكاميرات الخارجية")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  storage_device: yup.string(),
  period_of_record: yup.number(),
  show_screens: yup
    .string()
    .required("ادخل عدد شاشات العرض")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  camera_type: yup.string(),
  total_amount: yup
    .string()
    .required("ادخل اجمالي المدفوع")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  discount: yup
    .string()
    .required("ادخل الخصم ان وجد، ان لم يوجد ادخل 0")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
});
const cities = [
  "ابها",
  "الاحساء",
  "عرعر",
  "بحا",
  "بريدة",
  "الدمام",
  "ظهران",
  "حفر الباطن",
  "حائل",
  "جدة",
  "جيزان",
  "خبر",
  "المدينة",
  "مكة",
  "نجف",
  "نجران",
  "القطيف",
  "رابغ",
  "الرياض",
  "سكاكة",
  "تبوك",
  "الطائف",
  "ينبع",
];

const companyTypes = [
  "شركة تضامن",
  "شركة توصية بسيطة",
  "شركة مساهمة",
  "شركة مساهمة مبسطة",
  "شركة ذات مسئولية محدودة",
  "مؤسسة فردية",
];

const periods = [
  "1 شهر",
  "2 شهر",
  "3 شهر",
  "4 شهر",
  "5 شهر",
  "6 شهر",
  "7 شهر",
  "8 شهر",
  "9 شهر",
  "10 شهر",
  "11 شهر",
  "12 شهر",
];

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
  maxHeight: "90vh",
  overFlow: "scroll",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  direction: "rtl",
};

export default function ContractsTable({
  tableHead,
  tableRows,
  show,
  update,
  destroy,
  shown,
}) {
  const url = `${urls.contracts}/${shown?.id}`;
  const [responseMsg, setResponseMsg] = useState(null);
  const updateContract = (formData) => {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    const data = formData;
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setResponseMsg("تم تسجيل العقد بنجاح");
      })
      .catch((error) =>
        setResponseMsg("لقد تعذر الارسال، يرجى المحاولة فى وقت لاحق")
      );
  };

  const generatePDF = async () => {
    const input = document.getElementById("contract");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "pt", "a4");
      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "jpg", 0, 0, width, height, "none");
      pdf.autoPrint({ variant: "non-conform" });
      pdf.save("Vision-Things-Contract.pdf");
    });
  };

  // Handle modal

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  // Handle modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  const formik = useFormik({
    initialValues: {
      name: shown?.name,
      phone: shown?.phone,
      email: shown?.email,
      company_type: shown?.company_type,
      commercial_number: shown?.commercial_number,
      tax_number: shown?.tax_number,
      address: shown?.address,
      city: shown?.city,
      building_number: shown?.building_number,
      street_name: shown?.street_name,
      second_number: shown?.second_number,
      district: shown?.district,
      zip_code: shown?.zip_code,
      indoor_cameras: shown?.indoor_cameras,
      outdoor_cameras: shown?.outdoor_cameras,
      storage_device: shown?.storage_device,
      period_of_record: shown?.period_of_record,
      show_screens: shown?.show_screens,
      camera_type: shown?.camera_type,
      contract_date: shown?.contract_date,
      contract_number: shown?.contract_number,
      expiry_date: shown?.expiry_date,
      paid_amount: 0,
      discount: 0,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (formData) => {
      updateContract(formData);
    },
  });

  // Contract points
  const points = [
    `1. تكون الصيانة لمدة سنة ميلادية وتبدأ من تاريخ ${shown?.contract_date} وتنتهي بتاريخ
 ${shown?.expiry_date}.`,
    `2. تكلفة الزيارة (750) سبعمائة وخمسين ریال غير شامل الضريبة تدفع مقدما.`,
    `3. يقوم الطرف الأول بإبلاغ الطرف الثاني بالقطع التالفة أو الغير صالحة للاستعمال.`,
    `4. الطرف الأول غير مسئول عن أي إضافات جديدة على النظام الموجود.`,
    `5. إذا لم يؤمن الطرف الثاني القطع المطلوبة يتحمل المســئـوليــة ويكون الطرف الأول غيــر مسئول عن
الأضرار وعن سوء استخدام النظام.`,
    `6. لا يشمل عقد الصيانة الأعطال الكهربائية أو ما ينتج عنها من أضرار.`,
    `7. يقر الطرف الثاني بأن الأعداد والكميات وجميع المعلومات الموضح في الجدول أعلاه صحيـحـة ويـتحمل مسئولية أى خطأ تم عند إدخاله هذه البيانات.`,
    `8. يقوم الطرف الثاني بإرسال طلبات الصيانة بشكل رسمي او الكتروني عبر الوسائل التالية
جوال ( 00966581077506 ) بريد الكتروني ( info@vision-things.com ).`,
    `9. عند حدوث أي اختلاف بين الطرفين فإنه يتم حله ودياً وإذا تعذر ذلك يلجأ الطرفين إلى التحكيم فى المملكة العربية السعودية.`,
  ];

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
                  {row.contract_number}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.contract_date}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  <Button
                    variant="contained"
                    onClick={async () => {
                      await show(row);
                      generatePDF();
                    }}
                  >
                    تحميل
                  </Button>
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
              height: "50vh",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Container>
              <form className="contract-form" onSubmit={formik.handleSubmit}>
                <Typography variant="h6" mb={3}>
                  المعلومات الشخصية
                </Typography>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="name"
                      label="اسم الشخص او الشركة"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown ? shown.name : ""}
                    />
                    {formik.touched.name && Boolean(formik.errors.name) && (
                      <Typography color={"error"}>
                        {formik.errors.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="phone"
                      label="رقم الجوال"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.phone}
                    />
                    {formik.touched.phone && Boolean(formik.errors.phone) && (
                      <Typography color={"error"}>
                        {formik.errors.phone}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="email"
                      label="البريد الالكتروني"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.email}
                    />
                    {formik.touched.email && Boolean(formik.errors.email) && (
                      <Typography color={"error"}>
                        {formik.errors.email}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      select
                      name="company_type"
                      label="نوع الشركة"
                      type="text"
                      value={formik.values.company_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.company_type}
                    >
                      {companyTypes.map((e, index) => (
                        <MenuItem key={index} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="commercial_number"
                      label="رقم السجل التجاري"
                      value={formik.values.commercial_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.commercial_number}
                    />
                    {formik.touched.commercial_number &&
                      Boolean(formik.errors.commercial_number) && (
                        <Typography color={"error"}>
                          {formik.errors.commercial_number}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="tax_number"
                      label="الرقم الضريبي"
                      value={formik.values.tax_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.tax_number}
                    />
                    {formik.touched.tax_number &&
                      Boolean(formik.errors.tax_number) && (
                        <Typography color={"error"}>
                          {formik.errors.tax_number}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      name="address"
                      label="العنوان"
                      type="text"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.address}
                    />
                    {formik.touched.address &&
                      Boolean(formik.errors.address) && (
                        <Typography color={"error"}>
                          {formik.errors.address}
                        </Typography>
                      )}
                  </Grid>
                </Grid>
                <Typography variant="h6" my={3}>
                  العنوان
                </Typography>
                {/* Address */}
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      select
                      name="city"
                      label="المدينة"
                      type="text"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.city}
                    >
                      <MenuItem disabled value={"اختر المدينة"}>
                        اختر المدينة
                      </MenuItem>
                      {cities.map((e, index) => (
                        <MenuItem key={index} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="building_number"
                      label="رقم المبنى"
                      value={formik.values.building_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.building_number}
                    />
                    {formik.touched.building_number &&
                      Boolean(formik.errors.building_number) && (
                        <Typography color={"error"}>
                          {formik.errors.building_number}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="street_name"
                      label="الشارع"
                      type="text"
                      value={formik.values.street_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.street_name}
                    />
                    {formik.touched.street_name &&
                      Boolean(formik.errors.street_name) && (
                        <Typography color={"error"}>
                          {formik.errors.street_name}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="second_number"
                      label="رقم جوال آخر"
                      value={formik.values.second_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.second_number}
                    />
                    {formik.touched.second_number &&
                      Boolean(formik.errors.second_number) && (
                        <Typography color={"error"}>
                          {formik.errors.second_number}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="district"
                      label="الحي"
                      type="text"
                      value={formik.values.district}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.district}
                    />
                    {formik.touched.district &&
                      Boolean(formik.errors.district) && (
                        <Typography color={"error"}>
                          {formik.errors.district}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="zip_code"
                      label="الرمز البريدي"
                      value={formik.values.zip_code}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      defaultValue={shown?.zip_code}
                    />
                    {formik.touched.zip_code &&
                      Boolean(formik.errors.zip_code) && (
                        <Typography color={"error"}>
                          {formik.errors.zip_code}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" mb={3}>
                      اعداد الكاميرات وانواعها
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      name="indoor_cameras"
                      label="عدد الكاميرات الداخلية"
                      value={formik.values.indoor_cameras}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={shown?.indoor_cameras}
                    />
                    {formik.touched.indoor_cameras &&
                      Boolean(formik.errors.indoor_cameras) && (
                        <Typography color={"error"}>
                          {formik.errors.indoor_cameras}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      fullWidth
                      name="outdoor_cameras"
                      label="عدد الكاميرات الخارجية"
                      value={formik.values.outdoor_cameras}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={shown?.outdoor_cameras}
                    />
                    {formik.touched.outdoor_cameras &&
                      Boolean(formik.errors.outdoor_cameras) && (
                        <Typography color={"error"}>
                          {formik.errors.outdoor_cameras}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      fullWidth
                      select
                      name="storage_device"
                      label="نوع وحدة التخزين"
                      value={formik.values.storage_device}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={shown?.storage_device}
                    >
                      <MenuItem disabled>Select Storage Device Type</MenuItem>
                      <MenuItem value={"NVR"}>NVR</MenuItem>
                      <MenuItem value={"CCTV"}>CCTV</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      fullWidth
                      select
                      name="period_of_record"
                      label="مدة التسجيل"
                      value={formik.values.period_of_record}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={shown?.period_of_record}
                    >
                      <MenuItem disabled>اختر مدة التسجيل</MenuItem>
                      {periods.map((e, index) => (
                        <MenuItem key={index} value={parseInt(e)}>
                          {e}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      fullWidth
                      name="show_screens"
                      label="عدد شاشات العرض"
                      value={formik.values.show_screens}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={shown?.show_screens}
                    />
                    {formik.touched.show_screens &&
                      Boolean(formik.errors.show_screens) && (
                        <Typography color={"error"}>
                          {formik.errors.show_screens}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      fullWidth
                      select
                      name="camera_type"
                      label="نوع الكاميرا"
                      value={formik.values.camera_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultValue={shown?.camera_type}
                    >
                      <MenuItem disabled>اختر نوع الكاميرا</MenuItem>
                      <MenuItem value={"EZVIZ"}>EZVIZ</MenuItem>
                      <MenuItem value={"Hikvision"}>Hikvision</MenuItem>
                      <MenuItem value={"Dahua"}>Dahua</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      fullWidth
                      name="paid_amount"
                      label="اجمالي المدفوع"
                      value={formik.values.paid_amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.show_screens &&
                      Boolean(formik.errors.total_amount) && (
                        <Typography color={"error"}>
                          {formik.errors.total_amount}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      fullWidth
                      name="discount"
                      label="الخصم"
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.show_screens &&
                      Boolean(formik.errors.discount) && (
                        <Typography color={"error"}>
                          {formik.errors.discount}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item display={"none"}>
                    <TextField
                      name="contract_date"
                      value={shown?.contract_date}
                    />
                    <TextField
                      name="contract_number"
                      value={shown?.contract_number}
                    />
                  </Grid>
                  {responseMsg !== null && (
                    <Grid item xs={12}>
                      <Alert
                        severity={
                          responseMsg === "تم تسجيل العقد بنجاح"
                            ? "success"
                            : "error"
                        }
                      >
                        <Typography textAlign={"center"} mr={2}>
                          {responseMsg}
                        </Typography>
                      </Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      تعديل العقد
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </Box>
        </Box>
      </Modal>
      {/* Contract */}
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          id="contract"
          py={2}
          color={"black"}
          position={"absolute"}
          top={-1000000000}
          left={-1000000000}
          width={2480}
        >
          <Box pl={6} pr={10} pt={8}>
            {/* Date */}
            <p className="m-0">التاريخ/ {shown?.contract_date}</p>
            {/* QR Code */}
            <Box px={3}>
              <QRCode
                value={`Name: ${shown?.name}, Valid untill: ${shown?.expiry_date}`}
                size={80}
              />
            </Box>
            <Box pt={2}>
              <p>رقم العقد {shown?.contract_number}</p>
              {/* Title */}
              <Box display={"flex"} justifyContent={"center"} mt={-2}>
                <h4 className="m-0">عـقـد صـيـانـة كـامـيـرات مـراقـبـة</h4>
              </Box>
            </Box>

            <p>تم الاتفاق بين كل من</p>
            <p>
              الطرف الأول / شركة رؤية الأشياء لتقنـيـة المعـلـــومـات شـركــــة
              شــخص واحــــد بــسجــل تجــاري رقم 4030398257 شـــركة ذات
              مسـؤوليـة مـحـدودة وعنوانها حي الزهراء مدينة جدة وبـريـدهـا
              الإلكتـروني info@vision-things.com
            </p>
            <p>
              الطرف الثاني / {shown?.name} بسجل تجاري رقم{" "}
              {shown?.commercial_number} ورقم الجوال {shown?.phone} وعنوانها{" "}
              {shown?.address} وبريدها الإلكتروني {shown?.email}{" "}
            </p>
            <p>
              حيث إن الطــرف الأول هي إحـدى الشركــات المرخصـة من قبل الهيئة
              العليا للأمن الصناعي بتركيب وصيانة الأجهزة الأمنية في مدينة جدة
              برخصة رقم 22506073833 , فقد اتفق الطرفان على البنود التـالـيــة :
            </p>
            <p>
              يقوم الطرف الأول بصيانة كاميرات المراقبة الأمنية التابعة للطرف
              الثاني وهي كالاتي :
            </p>
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <table width={"100%"}>
                <tbody>
                  <tr>
                    <td>
                      <p>عدد الكاميرات الداخلية</p>
                    </td>
                    <td>
                      <p>{parseInt(shown?.indoor_cameras)}</p>
                    </td>
                    <td>
                      <p>نوع جهاز التخزين</p>
                    </td>
                    <td>{shown?.storage_device}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>عدد الكاميرات الخارجية</p>
                    </td>
                    <td>
                      <p>{parseInt(shown?.outdoor_cameras)}</p>
                    </td>
                    <td>
                      <p>سعة جهاز التخزين</p>
                    </td>
                    <td>
                      <p>{shown?.period_of_record}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>مجموع الكاميرات</p>
                    </td>
                    <td>
                      <p>
                        {parseInt(shown?.outdoor_cameras) +
                          parseInt(shown?.indoor_cameras)}
                      </p>
                    </td>
                    <td>
                      <p>عدد شاشات العرض</p>
                    </td>
                    <td>
                      <p>{shown?.show_screens}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>نوع الكاميرات</td>
                    <td colSpan={3}>
                      عدد{" "}
                      {parseInt(shown?.outdoor_cameras) +
                        parseInt(shown?.indoor_cameras)}{" "}
                      كاميرا من نوع {shown?.camera_type}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>وذلك وفق الشروط والأحكام التالية :</p>
            {points.map((point, index) => (
              <p key={index} style={{ fontSize: "small" }}>
                {point}
              </p>
            ))}
            <p style={{ textAlign: "center", margin: 0 }}>والله ولي التوفيق</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <p>الطرف الأول</p>
                <p>شركة رؤية الأشياء لتقنية المعلومات</p>
                {/* Stamp */}
                <div className="me-3" id={"stamp"}>
                  <img src="/images/stamp.png" alt="Stamp" width={100} />
                </div>
                {/* Signature */}
                <div style={{ position: "absolute", top: "50%" }}>
                  <img
                    src="/images/signature.png"
                    alt="Signature"
                    width={150}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>الطرف الثاني</p>
                <p></p>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
