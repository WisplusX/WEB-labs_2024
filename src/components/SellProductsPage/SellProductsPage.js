import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import CategoryRenderer from "../Renderers/CategoryRenderer";
import { Typography, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import { StyledButton, ProductSellPopover } from "../StyledButton";
import PriceCellRenderer from "../Renderers/PriceRenderer";

function SellProductsPage() {
  const [productSellAnchorEl, setProductSellAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [sellHistory, setSellHistory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/with-profit"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item.product.id,
          code: item.product.code,
          name: item.product.name,
          category: item.product.category,
          sellPrice: item.product.sellPrice,
          inStock: item.product.quantity,
          profit: item.profitPerItem,
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchSellHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sell");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item.id,
          code: item.product.code,
          name: item.product.name,
          category: item.product.category,
          sellPrice: item.sellPrice,
          amount: item.amount,
          profitSum: item.sum,
          date: new Date(item.sellDate).toLocaleString("uk-UA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setSellHistory(formattedData);
      } catch (error) {
        console.error("Error fetching sell history:", error);
      }
    };

    fetchProducts();
    fetchSellHistory();
  }, []);

  const handleProductSellClick = (event) => {
    setProductSellAnchorEl(event.currentTarget);
  };

  const handleCloseProductSell = () => {
    setProductSellAnchorEl(null);
  };

  const handleSellProduct = async (code, amount) => {
    try {
      const response = await fetch("http://localhost:8080/api/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: parseInt(code),
          amount: parseInt(amount),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    handleCloseProductSell();
  };

  const columns = [
    { field: "code", headerName: "Артикул", width: 120 },
    { field: "name", headerName: "Найменування", width: 230 },
    {
      field: "category",
      headerName: "Категорія",
      renderCell: (params) => <CategoryRenderer value={params.value} />,
      width: 180,
    },
    {
      field: "sellPrice",
      headerName: "Ціна продажу",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 180,
    },
    { field: "inStock", headerName: "На складі", width: 150 },
    {
      field: "profit",
      headerName: "Чистий прибуток з од.",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 180,
    },
  ];

  const columnsHistory = [
    { field: "code", headerName: "Артикул", width: 100 },
    { field: "name", headerName: "Найменування", width: 200 },
    {
      field: "category",
      headerName: "Категорія",
      renderCell: (params) => <CategoryRenderer value={params.value} />,
      width: 170,
    },
    {
      field: "sellPrice",
      headerName: "Ціна продажу",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 160,
    },
    { field: "amount", headerName: "Кількість", width: 130 },
    {
      field: "profitSum",
      headerName: "Прибуток",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 130,
    },
    { field: "date", headerName: "Дата", width: 180 },
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
              justifyContent: "space-between",
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
              Продаж товарів
            </Typography>

            <StyledButton
              label="Відмітити продаж"
              backgroundColor="#48BB78"
              hoverColor="#3C9D5E"
              onClick={handleProductSellClick}
            />
            <ProductSellPopover
              open={Boolean(productSellAnchorEl)}
              anchorEl={productSellAnchorEl}
              handleClose={handleCloseProductSell}
              onSellProduct={handleSellProduct}
            />
          </Box>
        </Box>

        <div
          style={{
            width: "calc(98vw - 210px)",
          }}
        >
          <DataGrid
            localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
            rows={products}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: {
                sortModel: [{ field: "name", sort: "asc" }],
              },
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
        </div>

        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "18px",
            ml: 4,
          }}
        >
          Історія продажів
        </Typography>

        <div
          style={{
            width: "calc(98vw - 210px)",
          }}
        >
          <DataGrid
            localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
            rows={sellHistory}
            columns={columnsHistory}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              sorting: {
                sortModel: [{ field: "date", sort: "desc" }],
              },
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
        </div>
      </Box>
    </Box>
  );
}

export default SellProductsPage;
