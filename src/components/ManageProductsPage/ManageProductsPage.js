import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import CategoryRenderer from "../Renderers/CategoryRenderer";
import { Typography, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import ProductActions from "./ProductActions";
import PriceCellRenderer from "../Renderers/PriceRenderer";

export const mockData = [];

function ManageProductsPage() {
  const [products, setProducts] = useState([]);

  const columns = [
    { field: "code", headerName: "Артикул", width: 150 },
    { field: "name", headerName: "Найменування", width: 250 },
    {
      field: "category",
      headerName: "Категорія",
      renderCell: (params) => <CategoryRenderer value={params.value} />,
      width: 200,
    },
    {
      field: "purchasePrice",
      headerName: "Ціна закупівлі",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 150,
    },
    {
      field: "sellPrice",
      headerName: "Ціна продажу",
      renderCell: (params) => <PriceCellRenderer value={params.value} />,
      width: 150,
    },
    {
      field: "quantity",
      headerName: "На складі",
      width: 150,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
              Управління товарами
            </Typography>

            <ProductActions />
          </Box>
        </Box>

        <div
          style={{
            height: "calc(100vh - 102px)",
            width: "calc(100vw - 210px)",
          }}
        >
          <DataGrid
            localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
            rows={products}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            pageSizeOptions={[25, 50, 100]}
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

export default ManageProductsPage;
