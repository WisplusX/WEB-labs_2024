import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { Typography, Box } from "@mui/material";
import {
  StyledButton,
  WaterPurchasePopover,
  WaterSellPopover,
  WaterSellPriceChangePopover,
} from "../StyledButton";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import PriceRenderer from "../Renderers/PriceRenderer";

function WaterSellingPage() {
  const [waterSellAnchorEl, setWaterSellAnchorEl] = useState(null);
  const [waterPurchaseAnchorEl, setWaterPurchaseAnchorEl] = useState(null);
  const [waterSellPriceChangeAnchorEl, setWaterSellPriceChangeAnchorEl] =
    useState(null);

  const [sellData, setSellData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);

  const [currentWaterLevelLiters, setCurrentWaterLevelLiters] = useState(-1);
  const [maxWaterLevelLiters, setMaxWaterLevelLiters] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [soldSum, setSoldSum] = useState(0);
  const [soldVolume, setSoldVolume] = useState(0);

  const waterLevelPercentage =
    (currentWaterLevelLiters / maxWaterLevelLiters) * 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const maxVolumeResponse = await fetch(
          "http://localhost:8080/api/water/max-volume"
        );
        const currentVolumeResponse = await fetch(
          "http://localhost:8080/api/water/current-volume"
        );
        const sellPriceResponse = await fetch(
          "http://localhost:8080/api/water/sell-price"
        );
        const purchasePriceResponse = await fetch(
          "http://localhost:8080/api/water/purchase-price"
        );
        const soldSumResponse = await fetch(
          "http://localhost:8080/api/water/sold-sum"
        );
        const soldVolumeResponse = await fetch(
          "http://localhost:8080/api/water/sold-volume"
        );
        const sellResponse = await fetch(
          "http://localhost:8080/api/water/sell"
        );
        const purchaseResponse = await fetch(
          "http://localhost:8080/api/water/purchase"
        );

        if (
          !maxVolumeResponse.ok ||
          !currentVolumeResponse.ok ||
          !sellPriceResponse.ok ||
          !purchasePriceResponse.ok ||
          !soldSumResponse.ok ||
          !soldVolumeResponse.ok ||
          !sellResponse.ok ||
          !purchaseResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const maxVolume = await maxVolumeResponse.json();
        const currentVolume = await currentVolumeResponse.json();
        const sellPrice = await sellPriceResponse.json();
        const purchasePrice = await purchasePriceResponse.json();
        const soldSum = await soldSumResponse.json();
        const soldVolume = await soldVolumeResponse.json();
        const sellData = await sellResponse.json();
        const purchaseData = await purchaseResponse.json();

        const formattedSellData = sellData.map((item) => ({
          ...item,
          sellDate: new Date(item.sellDate).toLocaleString("uk-UA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        const formattedPurchaseData = purchaseData.map((item) => ({
          ...item,
          purchaseDate: new Date(item.purchaseDate).toLocaleString("uk-UA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMaxWaterLevelLiters(maxVolume);
        setCurrentWaterLevelLiters(currentVolume);
        setSellPrice(sellPrice);
        setPurchasePrice(purchasePrice);
        setSoldSum(soldSum);
        setSoldVolume(soldVolume);
        setSellData(formattedSellData);
        setPurchaseData(formattedPurchaseData);
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };

    fetchData();
  }, []);

  const handleWaterPurchaseClick = (event) => {
    setWaterPurchaseAnchorEl(event.currentTarget);
  };

  const handleCloseWaterPurchase = () => {
    setWaterPurchaseAnchorEl(null);
  };

  const handleWaterSellClick = (event) => {
    setWaterSellAnchorEl(event.currentTarget);
  };

  const handleCloseWaterSell = () => {
    setWaterSellAnchorEl(null);
  };

  const handleWaterSellPriceChangeClick = (event) => {
    setWaterSellPriceChangeAnchorEl(event.currentTarget);
  };

  const handleCloseWaterSellPriceChange = () => {
    setWaterSellPriceChangeAnchorEl(null);
  };

  const handleWaterSellSubmit = async (quantity) => {
    const normalizedQuantity = quantity.replace(",", ".");
    const volume = parseFloat(normalizedQuantity);
    try {
      const response = await fetch("http://localhost:8080/api/water/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volume),
      });

      if (!response.ok) {
        throw new Error("Failed to mark the sale");
      }
    } catch (error) {
      console.error("Error marking the sale:", error);
    }
  };

  const handleWaterPurchaseSubmit = async (quantity) => {
    const normalizedQuantity = quantity.replace(",", ".");
    const volume = parseFloat(normalizedQuantity);
    try {
      const response = await fetch("http://localhost:8080/api/water/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volume),
      });

      if (!response.ok) {
        throw new Error("Failed to mark the purchase");
      }
    } catch (error) {
      console.error("Error marking the purchase:", error);
    }
  };

  const handleChangePrice = async (newPrice) => {
    const normalizedPrice = newPrice.replace(",", ".");
    const price = parseFloat(normalizedPrice);

    if (isNaN(price)) {
      console.error("Invalid price value");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/water", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(price),
      });

      if (!response.ok) {
        throw new Error("Failed to change the price");
      }
    } catch (error) {
      console.error("Error changing the price:", error);
    }
  };

  const columns = [
    { field: "sellDate", headerName: "Дата продажу", flex: 1 },
    { field: "volume", headerName: "Обʼєм", flex: 1 },
    {
      field: "sellPrice",
      headerName: "Ціна продажу",
      renderCell: (params) => <PriceRenderer value={params.value} />,
      flex: 1,
    },
    {
      field: "sum",
      headerName: "Прибуток",
      renderCell: (params) => <PriceRenderer value={params.value} />,
      flex: 1,
    },
  ];

  const columnsPurchase = [
    { field: "purchaseDate", headerName: "Дата закупівлі", flex: 1 },
    { field: "volume", headerName: "Обʼєм", flex: 1 },
    {
      field: "purchasePrice",
      headerName: "Ціна закупівлі",
      renderCell: (params) => <PriceRenderer value={params.value} />,
      flex: 1,
    },
    {
      field: "sum",
      headerName: "На сумму",
      renderCell: (params) => <PriceRenderer value={params.value} />,
      flex: 1,
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
              mb: 2,
              gap: 4,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "18px",
              }}
            >
              Автомат з водою
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: "200px",
                  height: "20px",
                  bgcolor: "#ccc",
                  position: "relative",
                  overflow: "hidden",
                  mr: 2,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${waterLevelPercentage}%`,
                    bgcolor: "#3182CE",
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ mr: 1, fontSize: "14px" }}>
                {currentWaterLevelLiters} / {maxWaterLevelLiters} л
              </Typography>
              <Typography variant="body2" sx={{ mr: 1, fontSize: "14px" }}>
                ({Math.round(waterLevelPercentage)}%)
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "14px",
                textTransform: "uppercase",
              }}
            >
              Продаж води
            </Typography>
            <Box
              sx={{
                backgroundColor: "#C6F6D5",
                color: "#25855A",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontSize: 14, fontWeight: 600 }}
              >
                <PriceRenderer value={sellPrice} />
              </Typography>
            </Box>
            <StyledButton
              label="Відмітити продаж"
              backgroundColor="#48BB78"
              hoverColor="#3C9D5E"
              onClick={handleWaterSellClick}
            />
            <WaterSellPopover
              open={Boolean(waterSellAnchorEl)}
              anchorEl={waterSellAnchorEl}
              handleClose={handleCloseWaterSell}
              onSell={handleWaterSellSubmit}
            />
            <StyledButton
              label="Змінити ціну продажу"
              backgroundColor="#3182CE"
              hoverColor="#2c6da1"
              onClick={handleWaterSellPriceChangeClick}
            />
            <WaterSellPriceChangePopover
              open={Boolean(waterSellPriceChangeAnchorEl)}
              anchorEl={waterSellPriceChangeAnchorEl}
              handleClose={handleCloseWaterSellPriceChange}
              onChangePrice={handleChangePrice}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Box
              sx={{
                backgroundColor: "#C6F6D5",
                color: "#25855A",
                px: 2,
                py: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontSize: 12 }}>
                Продано сьогодні:
              </Typography>
              <Typography variant="h2" sx={{ fontSize: 36, fontWeight: 400 }}>
                {soldVolume} <span style={{ fontSize: 18 }}>л</span>
              </Typography>
            </Box>

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
              <Typography variant="h2" sx={{ fontSize: 36, fontWeight: 400 }}>
                +{soldSum.toFixed(2).replace(".", ",")}{" "}
                <span style={{ fontSize: 18 }}>грн</span>
              </Typography>
            </Box>
          </Box>

          <div
            style={{
              width: "60vw",
            }}
          >
            <DataGrid
              localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
              rows={sellData}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
                sorting: {
                  sortModel: [{ field: "sellDate", sort: "desc" }],
                },
              }}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              sx={{ border: "none", mt: 2, fontSize: "14px" }}
            />
          </div>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "14px",
                textTransform: "uppercase",
              }}
            >
              Закупівля води
            </Typography>
            <Box
              sx={{
                backgroundColor: "#BEE3F8",
                color: "#2B6CB0",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontSize: 14, fontWeight: 600 }}
              >
                <PriceRenderer value={purchasePrice} />
              </Typography>
            </Box>
            <StyledButton
              label="Закупити"
              backgroundColor="#3182CE"
              hoverColor="#2c6da1"
              onClick={handleWaterPurchaseClick}
            />
            <WaterPurchasePopover
              open={Boolean(waterPurchaseAnchorEl)}
              anchorEl={waterPurchaseAnchorEl}
              handleClose={handleCloseWaterPurchase}
              maxWaterLevelLiters={maxWaterLevelLiters}
              currentWaterLevelLiters={currentWaterLevelLiters}
              onPurchase={handleWaterPurchaseSubmit}
            />
          </Box>

          <div
            style={{
              width: "60vw",
            }}
          >
            <DataGrid
              localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
              rows={purchaseData}
              columns={columnsPurchase}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
                sorting: {
                  sortModel: [{ field: "purchaseDate", sort: "desc" }],
                },
              }}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              sx={{ border: "none", mt: 2, fontSize: "14px" }}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default WaterSellingPage;
