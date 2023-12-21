"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import urls from "@/public/data/urls.json";

export default function AccountMenu() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const defaultProfilePic = "/images/profile_pic.jpg";
  const router = useRouter();
  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userID");
    router.push("/");
  };

  // User data
  const base_url = urls.base_url;
  const username = useSelector((state) => state.user.username);
  const profile_pic = useSelector((state) => state.user.profilePic);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Image
              src={
                profile_pic ? `${base_url}/${profile_pic}` : defaultProfilePic
              }
              width={40}
              height={40}
              alt="profile picture"
              style={{ cursor: "pointer", borderRadius: 4 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        sx={{ direction: "rtl" }}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar
            src={profile_pic ? `${base_url}/${profile_pic}` : defaultProfilePic}
          />
          <Typography mr={3}>{username}</Typography>
        </MenuItem>
        <Divider />
        <Link href={"/edit-profile"}>
          <MenuItem onClick={handleClose}>تعديل الملف الشخصي</MenuItem>
        </Link>
        <Link href={"/dashboard/visitors-messages"}>
          <MenuItem onClick={handleClose}>البريد</MenuItem>
        </Link>
        <Link href={"/dashboard/create-contract"}>
          <MenuItem onClick={handleClose}>انشاء عقد</MenuItem>
        </Link>

        <Divider />

        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          تسجيل الخروج
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
