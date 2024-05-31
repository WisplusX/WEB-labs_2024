import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { BsBox } from "react-icons/bs";
import { MdOutlineBarChart } from "react-icons/md";
import Box from "@mui/material/Box";

function SideBar() {
  const [totalSoldAmount, setTotalSoldAmount] = useState(0);
  const [totalSoldSum, setTotalSoldSum] = useState(0.0);

  useEffect(() => {
    const fetchTotalSoldAmount = async () => {
      try {
        const today = new Date().toISOString().split("T")[0]; // Получаем текущую дату в формате YYYY-MM-DD
        const response = await fetch(
          `http://localhost:8080/api/sell/total-sold-amount?startDate=${today}&endDate=${today}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTotalSoldAmount(data);
      } catch (error) {
        console.error("Error fetching total sold amount:", error);
      }
    };

    const fetchTotalSoldSum = async () => {
      try {
        const today = new Date().toISOString().split("T")[0]; // Получаем текущую дату в формате YYYY-MM-DD
        const response = await fetch(
          `http://localhost:8080/api/sell/total-sold-sum?startDate=${today}&endDate=${today}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTotalSoldSum(data);
      } catch (error) {
        console.error("Error fetching total sold sum:", error);
      }
    };

    fetchTotalSoldAmount();
    fetchTotalSoldSum();
  }, []);

  return (
    <Drawer
      sx={{
        width: 210,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          bgcolor: "#2B2E30",
          minHeight: "100vh",
          width: 210,
          boxSizing: "border-box",
          position: "relative",
          zIndex: "auto",
          border: "none",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          bgcolor: "#2B2E30",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          color: "white",
          p: 2,
        }}
      >
        <BsBox size={20} />

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: "14px",
            marginLeft: 1,
          }}
        >
          Менеджмент складу
        </Typography>
      </Box>

      {/* Пункты меню */}
      <List sx={{ color: "white", bgcolor: "#383A3E", py: 0 }}>
        <ListItemButton href="/manage" sx={{ height: "50px" }}>
          <ListItemText
            sx={{
              textTransform: "uppercase",
              fontSize: "14px",
              opacity: 0.7,
            }}
            primary="управління товарами"
          />
        </ListItemButton>
        <Divider
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            height: "0.5px",
          }}
        />
        <ListItemButton href="/purchase" sx={{ height: "50px" }}>
          <ListItemText
            sx={{
              textTransform: "uppercase",
              fontSize: "14px",
              opacity: 0.7,
            }}
            primary="закупівля товарів"
          />
        </ListItemButton>
        <Divider
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            height: "0.5px",
          }}
        />
        <ListItemButton href="/sell" sx={{ height: "50px" }}>
          <ListItemText
            sx={{
              textTransform: "uppercase",
              fontSize: "14px",
              opacity: 0.7,
            }}
            primary="продаж товарів"
          />
        </ListItemButton>
        <Divider
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            height: "0.5px",
          }}
        />
        <ListItemButton href="water" sx={{ height: "50px" }}>
          <ListItemText
            sx={{
              textTransform: "uppercase",
              fontSize: "14px",
              opacity: 0.7,
            }}
            primary="вода"
          />
        </ListItemButton>
        <Divider
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            height: "0.5px",
          }}
        />
        <ListItemButton href="/analytics" sx={{ height: "50px" }}>
          <ListItemText
            sx={{
              textTransform: "uppercase",
              fontSize: "14px",
              opacity: 0.7,
            }}
            primary="аналітика і звіти"
          />
        </ListItemButton>
      </List>

      <Box
        sx={{
          bgcolor: "#2B2E30",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          color: "white",
          p: 2,
        }}
      >
        <MdOutlineBarChart size={22} />

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,

            fontSize: "14px",
            marginLeft: 1,
          }}
        >
          Денна аналітика
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "#38A169",
          color: "#fff",
          p: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "12px",
            opacity: 0.7,
          }}
        >
          Прибуток за сьогодні:
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: "24px",
            opacity: 1,
            color: "#fff",
            mb: 0,
            display: "inline",
            fontWeight: "500",
          }}
        >
          +{totalSoldSum.toFixed(2).replace(".", ",")}
        </Typography>{" "}
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            opacity: 1,
            color: "#fff",
            display: "inline",
          }}
        >
          грн
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "#3182CE",
          color: "#fff",
          p: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "12px",
            opacity: 0.7,
          }}
        >
          Продано сьогодні
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            opacity: 1,
            color: "#fff",
            mb: 0,
            display: "inline",
          }}
        >
          {totalSoldAmount}
        </Typography>{" "}
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            opacity: 1,
            color: "#fff",
            display: "inline",
          }}
        >
          од. товару
        </Typography>
      </Box>
    </Drawer>
  );
}

export default SideBar;
