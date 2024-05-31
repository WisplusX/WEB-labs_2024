import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Typography, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import CategoryRenderer from "../Renderers/CategoryRenderer";
import PriceRenderer from "../Renderers/PriceRenderer";
import dayjs from "dayjs";

function AnalyticsPage() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [sellData, setSellData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);

  const [totalSoldAmount, setTotalSoldAmount] = useState(0);
  const [totalSoldSum, setTotalSoldSum] = useState(0);
  const [totalPurchasedAmount, setTotalPurchasedAmount] = useState(0);
  const [totalPurchasedSum, setTotalPurchasedSum] = useState(0);

  const today = dayjs();

  useEffect(() => {
    if (startDate && endDate) {
      fetchSellStatistics(startDate, endDate);
      fetchPurchaseStatistics(startDate, endDate);
      fetchTotalSoldAmount(startDate, endDate);
      fetchTotalSoldSum(startDate, endDate);
      fetchTotalPurchasedAmount(startDate, endDate);
      fetchTotalPurchasedSum(startDate, endDate);
    }
  }, [startDate, endDate]);

  const fetchSellStatistics = async (start, end) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sell/statistics?startDate=${start.format(
          "YYYY-MM-DD"
        )}&endDate=${end.format("YYYY-MM-DD")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sell statistics");
      }
      const data = await response.json();
      const dataWithId = data.map((item, index) => ({ ...item, id: index }));
      setSellData(dataWithId);
    } catch (error) {
      console.error("Error fetching sell statistics:", error);
    }
  };

  const fetchPurchaseStatistics = async (start, end) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/purchase/statistics?startDate=${start.format(
          "YYYY-MM-DD"
        )}&endDate=${end.format("YYYY-MM-DD")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch purchase statistics");
      }
      const data = await response.json();
      const dataWithId = data.map((item, index) => ({ ...item, id: index }));
      setPurchaseData(dataWithId);
    } catch (error) {
      console.error("Error fetching purchase statistics:", error);
    }
  };

  const fetchTotalSoldAmount = async (start, end) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sell/total-sold-amount?startDate=${start.format(
          "YYYY-MM-DD"
        )}&endDate=${end.format("YYYY-MM-DD")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total sold amount");
      }
      const data = await response.json();
      setTotalSoldAmount(data);
    } catch (error) {
      console.error("Error fetching total sold amount:", error);
    }
  };

  const fetchTotalSoldSum = async (start, end) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sell/total-sold-sum?startDate=${start.format(
          "YYYY-MM-DD"
        )}&endDate=${end.format("YYYY-MM-DD")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total sold sum");
      }
      const data = await response.json();
      setTotalSoldSum(data);
    } catch (error) {
      console.error("Error fetching total sold sum:", error);
    }
  };

  const fetchTotalPurchasedAmount = async (start, end) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/purchase/total-purchased-amount?startDate=${start.format(
          "YYYY-MM-DD"
        )}&endDate=${end.format("YYYY-MM-DD")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total purchased amount");
      }
      const data = await response.json();
      setTotalPurchasedAmount(data);
    } catch (error) {
      console.error("Error fetching total purchased amount:", error);
    }
  };

  const fetchTotalPurchasedSum = async (start, end) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/purchase/total-purchased-sum?startDate=${start.format(
          "YYYY-MM-DD"
        )}&endDate=${end.format("YYYY-MM-DD")}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total purchased sum");
      }
      const data = await response.json();
      setTotalPurchasedSum(data);
    } catch (error) {
      console.error("Error fetching total purchased sum:", error);
    }
  };

  const columnsSellHistory = [
    { field: "code", headerName: "Артикул", width: 120 },
    { field: "name", headerName: "Найменування", width: 260 },
    {
      field: "category",
      headerName: "Категорія",
      renderCell: (params) => <CategoryRenderer value={params.value} />,
      width: 180,
    },
    { field: "amount", headerName: "Кількість", width: 150 },
    {
      field: "sum",
      headerName: "Прибуток",
      renderCell: (params) => <PriceRenderer value={params.value} />,
      width: 170,
    },
  ];

  const columnsPurchaseHistory = [
    { field: "code", headerName: "Артикул", width: 120 },
    { field: "name", headerName: "Найменування", width: 260 },
    {
      field: "category",
      headerName: "Категорія",
      renderCell: (params) => <CategoryRenderer value={params.value} />,
      width: 180,
    },
    { field: "amount", headerName: "Кількість", width: 150 },
    {
      field: "sum",
      headerName: "На суму",
      renderCell: (params) => <PriceRenderer value={params.value} />,
      width: 170,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <SideBar />

      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.04)",
            p: 4,
            pb: 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "18px",
              }}
            >
              Аналітика і звіти
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Початкова дата"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                sx={{ bgcolor: "white" }}
              />
              <MobileDatePicker
                label="Кінцева дата"
                value={endDate}
                minDate={startDate}
                maxDate={today}
                onChange={(newValue) => setEndDate(newValue)}
                disabled={!startDate}
                sx={{ bgcolor: startDate ? "white" : "#F5F5F5" }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        {startDate && endDate ? (
          <>
            <Box sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  статистика продажів за цей період
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                {/* Прямоугольник 1: Продано сьогодні */}
                <Box
                  sx={{
                    backgroundColor: "#C6F6D5",
                    color: "#25855A",

                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontSize: 12 }}>
                    Продано:
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: 36, fontWeight: 400 }}
                  >
                    {totalSoldAmount}{" "}
                    <span style={{ fontSize: 18 }}>од. товару</span>
                  </Typography>
                </Box>

                {/* Прямоугольник 2: Загальна сума прибутку */}
                <Box
                  sx={{
                    backgroundColor: "#C6F6D5",
                    color: "#25855A",
                    padding: 1,
                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontSize: 12 }}>
                    Загальна сума прибутку:
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: 36, fontWeight: 400 }}
                  >
                    +{totalSoldSum.toFixed(2).replace(".", ",")}{" "}
                    <span style={{ fontSize: 18 }}>грн</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <div
              style={{
                width: "calc(98vw - 210px)",
              }}
            >
              <DataGrid
                localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
                rows={sellData}
                columns={columnsSellHistory}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                sx={{ border: "none", mx: 4, fontSize: "14px" }}
              />
            </div>
            <Box sx={{ px: 4, mt: 1, mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  статистика закупівель за цей період
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                {/* Прямоугольник 1: Продано сьогодні */}
                <Box
                  sx={{
                    backgroundColor: "#BEE3F8",
                    color: "#2B6CB0",
                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontSize: 12 }}>
                    Закуплено:
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: 36, fontWeight: 400 }}
                  >
                    {totalPurchasedAmount}{" "}
                    <span style={{ fontSize: 18 }}>од. товару</span>
                  </Typography>
                </Box>

                {/* Прямоугольник 2: Загальна сума прибутку */}
                <Box
                  sx={{
                    backgroundColor: "#BEE3F8",
                    color: "#2B6CB0",
                    padding: 1,
                    px: 2,
                    py: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontSize: 12 }}>
                    Загальна сума закупівель:
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: 36, fontWeight: 400 }}
                  >
                    +{totalPurchasedSum.toFixed(2).replace(".", ",")}{" "}
                    <span style={{ fontSize: 18 }}>грн</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                width: "calc(98vw - 210px)",
              }}
            >
              <DataGrid
                localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
                rows={purchaseData}
                columns={columnsPurchaseHistory}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                sx={{ border: "none", mx: 4, mt: 2, fontSize: "14px" }}
              />
            </Box>
          </>
        ) : (
          <Typography variant="body1" sx={{ m: 4 }}>
            Будь ласка, виберіть початкову та кінцеву дати для перегляду
            аналітики.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AnalyticsPage;
