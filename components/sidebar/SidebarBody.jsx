"use effect";
import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import categories from "@/public/data/categories.json";
import { SidebarIcons } from "@/public/icons/MainIcons";
import Link from "next/link";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useSelector } from "react-redux";
import axios from "axios";
import urls from "@/public/data/urls.json";

const SidebarBody = () => {
  const isActive = useSelector((state) => state.sidebar.isSidebarActive);

  // Handle sidebar accordions
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded && isActive ? panel : false);
  };
  const [subExpanded, setSubExpanded] = React.useState(false);

  const handleSubChange = (panel) => (event, isSubExpanded) => {
    setSubExpanded(isSubExpanded ? panel : false);
  };

  const membersUrl = urls.members;
  const userID =
    typeof window !== "undefined" && window.localStorage.getItem("userID");
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${membersUrl}/${userID}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <Box
      sx={{
        overflowY: isActive ? "scroll" : "hidden",
        overflowX: "hidden",
      }}
      id="main_sidebar_body"
    >
      <Container>
        {categories.map((cat) => {
          if (
            cat.allowed_users === "all" ||
            (cat.allowed_users === "view_mail" && user?.view_mail === "on") ||
            (cat.allowed_users === "manage_pages" &&
              user?.manage_pages === "on") ||
            (cat.allowed_users === "contracts" &&
              user?.manage_contracts === "on") ||
            (cat.allowed_users === "contracts" &&
              user?.create_contract === "on") ||
            (cat.allowed_users === "manage_promocodes" &&
              user?.manage_promocodes === "on") ||
            (cat.allowed_users === "manage_members" &&
              user?.manage_members === "on") ||
            (cat.allowed_users === "view_reports" &&
              user?.view_reports === "on")
          ) {
            return (
              <Accordion
                key={cat.id}
                sx={{ bgcolor: "white", boxShadow: 0, color: "#010e28" }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: "#010e28", display: !isActive && "none" }}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ height: 70 }}
                >
                  <Box fontSize={20}>
                    {SidebarIcons.map((e) => {
                      if (e.title === cat.title) {
                        return <Box key={e.title}>{e.icon}</Box>;
                      }
                    })}
                  </Box>
                  <Typography
                    whiteSpace={"nowrap"}
                    pt={"5px"}
                    display={!isActive && "none"}
                    pr={2}
                  >
                    {cat.title}
                  </Typography>
                </AccordionSummary>
                {cat.content.map((e) => {
                  if (
                    e.allowed_users === "all" ||
                    (e.allowed_users === "manage_contracts" &&
                      user?.manage_contracts === "on") ||
                    (e.allowed_users === "create_contract" &&
                      user?.create_contract === "on")
                  ) {
                    return (
                      <Link key={e.id} href={e.url}>
                        <AccordionDetails
                          sx={{ display: !isActive && "none", ml: 1 }}
                        >
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Typography whiteSpace={"nowrap"} color={"#010e28"}>
                              {e.title}
                            </Typography>
                            <KeyboardArrowLeftIcon sx={{ color: "#010e28" }} />
                          </Box>
                        </AccordionDetails>
                      </Link>
                    );
                  }
                })}
              </Accordion>
            );
          }
        })}
      </Container>
    </Box>
  );
};

export default SidebarBody;
