"use client"
import {Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import Section from "@/templates/Section";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import urls from "@/public/data/urls.json"
import {setProfilePic, setUsername} from "@/store/userSlice";
const EditProfile = ()=> {
    const dispatch = useDispatch();
    const [resMsg, setResMsg] = React.useState(null);
    const base_url = urls.base_url;
    const url = urls.members;
    const userID = useSelector((state)=>state.user.id);
    const profile_pic = useSelector((state)=>state.user.profilePic);
    const username = useSelector((state)=>state.user.username);
    const defaultProfilePic = "/images/profile_pic.jpg";
    const manage_contracts = useSelector((state)=>state.user.manage_contracts);
    const create_contract = useSelector((state)=>state.user.create_contract);
    const manage_pages = useSelector((state)=>state.user.manage_pages);
    const manage_members = useSelector((state)=>state.user.manage_members);
    const manage_promocodes = useSelector((state)=>state.user.manage_promocodes);
    const view_reports = useSelector((state)=>state.user.view_reports);


// Update
    const update = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        axios
            .post(`${url}/${userID}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                axios
                    .get(`${url}/${userID}`)
                    .then((res) => {
                        dispatch(setUsername(res.data.username.username));
                        res.data.username.profile_pic && dispatch(setProfilePic(res.data.username.profile_pic));
                    })
                    .finally(() => {
                        setResMsg("تم التعديل بنجاح.");
                        location.reload();
                    })
                    .catch((err) =>
                        alert(
                            "يوجد خطأ فى الاتصال بقاعدة البيانات، يرجى التأكد من صحة البيانات المدخلة او اتصالك بالانترنت"
                        )
                    );
            });
    };
    return(
        <Box minHeight={"100vh"} id={"dashboard-home"} sx={{direction:"rtl"}}>
            <Container>
              <Section>
                  <Typography variant={"h4"} mb={3}>تعديل الملف الشخصي</Typography>
                  <form onSubmit={update}>
                      <Grid container spacing={5}>
                          <Grid item xs={12}>
                              <img src={profile_pic ? `${base_url}/${profile_pic}`: defaultProfilePic} style={{width:200, height:200, borderRadius:'100%', border:'5px solid #eee'}}/>
                          </Grid>
                          <Grid item xs={12}>
                              <input name={"profile_pic"} type={"file"}/>
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  name="username"
                                  variant="standard"
                                  label="اسم المستخدم"
                                  defaultValue={username}
                                  required
                                  focused
                                  sx={{width:400}}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  name="password"
                                  variant="standard"
                                  label='تعيين كلمة مرور جديدة'
                                  focused
                                  type={'password'}
                                  sx={{width:400}}
                              />
                          </Grid>
                          <Grid item xs={12}>
                                  {resMsg !== null && (
                                      <Alert severity="success">{resMsg}</Alert>
                                  )}
                          </Grid>

                          {/* Hidden elements */}
                          <Grid item xs={6} display={'none'}>
                              <FormControlLabel
                                  control={<Checkbox name="manage_pages" />}
                                  label="ادارة صفحات الموقع"
                                  checked={manage_pages}
                              />
                          </Grid>
                          <Grid item xs={6}  display={'none'}>
                              <FormControlLabel
                                  control={<Checkbox name="manage_contracts" />}
                                  label="ادارة العقود"
                                  checked={manage_contracts}
                              />
                          </Grid>
                          <Grid item xs={6}  display={'none'}>
                              <FormControlLabel
                                  control={<Checkbox name="create_contract" />}
                                  label="اضافة عقد جديد"
                                  checked={create_contract}
                              />
                          </Grid>
                          <Grid item xs={6}  display={'none'}>
                              <FormControlLabel
                                  control={<Checkbox name="manage_promocodes" />}
                                  label="ادارة كوبونات الخصم"
                                  checked={manage_promocodes}
                              />
                          </Grid>
                          <Grid item xs={6}  display={'none'}>
                              <FormControlLabel
                                  control={<Checkbox name="manage_members" />}
                                  label="ادارة اﻻعضاء"
                                  checked={manage_members}
                              />
                          </Grid>
                          <Grid item xs={6}  display={'none'}>
                              <FormControlLabel
                                  control={<Checkbox name="view_reports" />}
                                  label="الاطلاع على التقارير"
                                  checked={view_reports}
                              />
                          </Grid>

                          {/*Submit button*/}
                          <Grid
                                  item
                                  xs={12}
                                  display={"flex"}
                                  justifyContent={"space-between"}
                              >
                                  <Button type="submit" variant="contained">
                                      تعديل
                                  </Button>
                          </Grid>
                      </Grid>
                  </form>
              </Section>
            </Container>
         </Box>)
}
export default EditProfile;