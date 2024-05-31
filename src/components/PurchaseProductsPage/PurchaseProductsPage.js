import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import CategoryRenderer from "../Renderers/CategoryRenderer";
import { Typography, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import { StyledButton, ProductPurchasePopover } from "../StyledButton";
import PriceCellRenderer from "../Renderers/PriceRenderer";

function PurchaseProductsPage() {
  const [productPurchaseAnchorEl, setProductPurchaseAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/products/with-last-purchase"
        );
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.map((item) => ({
            id: item.product.id,
            code: item.product.code,
            name: item.product.name,
            category: item.product.category,
            purchasePrice: item.product.purchasePrice,
            inStock: item.product.quantity,
            lastPurchase: item.lastPurchase,
          }));
          setProducts(transformedData);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchPurchaseHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/purchase");
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.map((entry) => ({
            id: entry.id,
            code: entry.product.code,
            name: entry.product.name,
            category: entry.product.category,
            purchasePrice: entry.purchasePrice,
            amount: entry.amount,
            sum: entry.sum,
            date: new Date(entry.purchaseDate).toLocaleString("uk-UA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));
          setPurchaseHistory(transformedData);
        } else {
          console.error("Failed to fetch purchase history");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
    fetchPurchaseHistory();
  }, []);

  const handleProductPurchaseClick = (event) => {
    setProductPurchaseAnchorEl(event.currentTarget);
  };

  const handleCloseProductPurchase = () => {
    setProductPurchaseAnchorEl(null);
  };

  const handlePurchase = async (code, amount) => {
    try {
      const response = await fetch("http://localhost:8080/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: parseInt(code),
          amount: parseInt(amount),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Purchase successful:", result);
      } else {
        console.error("Failed to purchase product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    { field: "code", headerName: "Артикул", width: 110 },
    { field: "name", headerName: "Найменування", width: 200 },
    {
      field: "category",
      headerName: "Категорія",
      renderCell: (params) => <CategoryRenderer value={params.value} />,
      width: 160,
    },
    {
      field: "purchasePrice",
      headerName: "Ціна закупівлі",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 150,
    },
    { field: "inStock", headerName: "На складі", width: 110 },
    { field: "lastPurchase", headerName: "Остання закупівля", width: 180 },
    {
      field: "status",
      headerName: "Статус",
      renderCell: (params) => {
        const inStock = params.row.inStock;
        let statusColor = "";
        let statusText = "";
        if (inStock === 0) {
          statusColor = "#F56565";
          statusText = "Немає";
        } else if (inStock <= 20) {
          statusColor = "#ECC94B";
          statusText = "Закінчується";
        } else {
          statusColor = "#48BB78";
          statusText = "Достатньо";
        }
        return (
          <Box
            sx={{
              px: 2,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
              bgcolor: statusColor,
              marginRight: "4px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              {statusText}
            </span>
          </Box>
        );
      },
      width: 150,
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
      field: "purchasePrice",
      headerName: "Ціна закупівлі",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 170,
    },
    { field: "amount", headerName: "Кількість", width: 130 },
    {
      field: "sum",
      headerName: "На суму",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 120,
    },
    {
      field: "date",
      headerName: "Дата",
      width: 180,
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
              Закупівля товарів
            </Typography>

            <StyledButton
              label="Закупити товар"
              backgroundColor="#3182CE"
              hoverColor="#2c6da1"
              onClick={handleProductPurchaseClick}
            />
            <ProductPurchasePopover
              open={Boolean(productPurchaseAnchorEl)}
              anchorEl={productPurchaseAnchorEl}
              handleClose={handleCloseProductPurchase}
              onPurchase={handlePurchase}
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
                sortModel: [{ field: "inStock", sort: "asc" }],
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
          Історія закупівель
        </Typography>

        <div
          style={{
            width: "calc(98vw - 210px)",
          }}
        >
          <DataGrid
            localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
            rows={purchaseHistory}
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

export default PurchaseProductsPage;
