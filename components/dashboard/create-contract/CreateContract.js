"use client";
import React, { useEffect, useState } from "react";
import Section from "@/templates/Section";
import {
  Box,
  Grid,
  Button,
  Typography,
  Container,
  TextField,
  MenuItem,
  Skeleton,
  Modal,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import urls from "@/public/data/urls.json";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  camera_type: yup.string().required(),
  paid_amount: yup
    .string()
    .required("ادخل اجمالي قيمة العقد قبل الخصم")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
  discount: yup
    .string()
    .required("ادخل الخصم ان وجد، ان لم يوجد ادخل 0")
    .matches(/^[0-9]+$/, "ادخل رقم صالح"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  width: 400,
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const CreateContract = () => {
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
  // Handle modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const url = urls.contracts;
  const [responseMsg, setResponseMsg] = useState(null);
  const createContract = (formData) => {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    const data = formData;
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setResponseMsg("تم تسجيل العقد بنجاح");
      })
      .catch((error) =>
        setResponseMsg("لقد تعذر الارسال، يرجى المحاولة فى وقت لاحق")
      );
  };
  const contractNumber = Math.floor(Math.random() * 100000000 + 1);

  // contract
  const date = new Date();

  const currentDate = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()}`;

  const expiryYear = new Date();
  expiryYear.setFullYear(expiryYear.getFullYear() + 1);

  const expiryDate = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${expiryYear.getFullYear()} `;
  const points = [
    `1. تكون الصيانة لمدة سنة ميلادية وتبدأ من تاريخ ${currentDate} وتنتهي بتاريخ
 ${expiryDate}.`,
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

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      company_type: "",
      commercial_number: "",
      tax_number: "",
      address: "",
      city: "جدة",
      building_number: "",
      street_name: "",
      second_number: "",
      district: "",
      zip_code: "",
      indoor_cameras: 1,
      outdoor_cameras: 1,
      storage_device: "NVR",
      period_of_record: 1,
      show_screens: 1,
      camera_type: "EZVIZ",
      contract_number: contractNumber,
      contract_date: currentDate,
      expiry_date: expiryDate,
      paid_amount: "",
      discount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formData) => {
      createContract(formData);
      handleOpen();
    },
  });
  return (
    <Section>
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
            />
            {formik.touched.name && Boolean(formik.errors.name) && (
              <Typography color={"error"}>{formik.errors.name}</Typography>
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
            />
            {formik.touched.phone && Boolean(formik.errors.phone) && (
              <Typography color={"error"}>{formik.errors.phone}</Typography>
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
            />
            {formik.touched.email && Boolean(formik.errors.email) && (
              <Typography color={"error"}>{formik.errors.email}</Typography>
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
            />
            {formik.touched.tax_number && Boolean(formik.errors.tax_number) && (
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
            />
            {formik.touched.address && Boolean(formik.errors.address) && (
              <Typography color={"error"}>{formik.errors.address}</Typography>
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
            />
            {formik.touched.district && Boolean(formik.errors.district) && (
              <Typography color={"error"}>{formik.errors.district}</Typography>
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
            />
            {formik.touched.zip_code && Boolean(formik.errors.zip_code) && (
              <Typography color={"error"}>{formik.errors.zip_code}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" mb={3}>
              تفاصيل المنتج
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
              label="اجمالي قيمة العقد قبل الخصم"
              value={formik.values.paid_amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.paid_amount &&
              Boolean(formik.errors.paid_amount) && (
                <Typography color={"error"}>
                  {formik.errors.paid_amount}
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
            {formik.touched.discount && Boolean(formik.errors.discount) && (
              <Typography color={"error"}>{formik.errors.discount}</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              اضافة العقد
            </Button>
          </Grid>
        </Grid>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container>
            {responseMsg === null && (
              <Box id="modal-modal-description" sx={{ mt: 2 }}>
                <Skeleton variant="rounded" width={"100%"} height={40} />
              </Box>
            )}
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, direction: "rtl" }}
            >
              {responseMsg}
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              pt={3}
            >
              {responseMsg === "تم تسجيل العقد بنجاح" ? (
                <Button variant="contained" onClick={generatePDF}>
                  {" "}
                  تحميل نسخة من العقد
                </Button>
              ) : (
                <Button variant="contained" onClick={handleClose}>
                  اغلاق
                </Button>
              )}
            </Box>
          </Container>
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
            <p className="m-0">التاريخ/ {currentDate}</p>
            {/* QR Code */}
            <Box px={3}>
              <QRCode
                value={`Name: ${formik.values.name}, Valid untill: ${expiryDate}`}
                size={80}
              />
            </Box>
            <Box pt={2}>
              <p>رقم العقد {formik.values.contract_number}</p>
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
              الطرف الثاني / {formik.values.name} بسجل تجاري رقم{" "}
              {formik.values.commercial_number} ورقم الجوال{" "}
              {formik.values.phone} وعنوانها {formik.values.address} وبريدها
              الإلكتروني {formik.values.email}{" "}
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
                      <p>{parseInt(formik.values.indoor_cameras)}</p>
                    </td>
                    <td>
                      <p>نوع جهاز التخزين</p>
                    </td>
                    <td>{formik.values.storage_device}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>عدد الكاميرات الخارجية</p>
                    </td>
                    <td>
                      <p>{parseInt(formik.values.outdoor_cameras)}</p>
                    </td>
                    <td>
                      <p>سعة جهاز التخزين</p>
                    </td>
                    <td>
                      <p>{formik.values.period_of_record}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>مجموع الكاميرات</p>
                    </td>
                    <td>
                      <p>
                        {parseInt(formik.values.outdoor_cameras) +
                          parseInt(formik.values.indoor_cameras)}
                      </p>
                    </td>

                    <td>
                      <p>عدد شاشات العرض</p>
                    </td>
                    <td>
                      <p>{formik.values.show_screens}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>نوع الكاميرات</td>
                    <td colSpan={3}>
                      عدد{" "}
                      {parseInt(formik.values.outdoor_cameras) +
                        parseInt(formik.values.indoor_cameras)}{" "}
                      كاميرا من نوع {formik.values.camera_type}
                    </td>
                  </tr>
                </tbody>
              </table>{" "}
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
                <div id={"stamp"}>
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
    </Section>
  );
};

export default CreateContract;
