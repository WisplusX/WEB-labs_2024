import React from "react";
import Typography from "@mui/material/Typography";
import SideBar from "../SideBar";
import Box from "@mui/material/Box";

function WelcomePage() {
  return (
    <Box sx={{ display: "flex", margin: 0, padding: 0 }}>
      <SideBar />

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.04)", py: "20px", px: "40px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: "18px",
            }}
          >
            Система управління складом
          </Typography>
        </Box>

        <Box sx={{ py: "30px", px: "40px" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontSize: "48px", ml: "-3px" }}
          >
            Вітаємо в системі.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontSize: "18px" }}>
            Будь ласка, оберіть необхідний пункт з бокового меню.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default WelcomePage;
