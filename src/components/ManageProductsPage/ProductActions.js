import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  StyledButton,
  PriceChangePopover,
  AddPopover,
  DeletePopover,
} from "../StyledButton";

const ProductActions = () => {
  const [priceChangeAnchorEl, setPriceChangeAnchorEl] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const [addAnchorEl, setAddAnchorEl] = useState(null);
  const [addError, setAddError] = useState(null);

  const [newProduct, setNewProduct] = useState({
    code: "",
    name: "",
    category: "FOOD",
    purchasePrice: "",
    sellPrice: "",
  });

  const [priceChange, setPriceChange] = useState({
    code: "",
    price: "",
  });

  const [deleteCode, setDeleteCode] = useState("");

  const handlePriceChangeClick = (event) => {
    setPriceChangeAnchorEl(event.currentTarget);
  };

  const handleDeleteClick = (event) => {
    setDeleteAnchorEl(event.currentTarget);
  };

  const handleAddClick = (event) => {
    setAddAnchorEl(event.currentTarget);
  };

  const handleClosePriceChange = () => {
    setPriceChangeAnchorEl(null);
  };

  const handleCloseDelete = () => {
    setDeleteAnchorEl(null);
  };

  const handleCloseAdd = () => {
    setAddAnchorEl(null);
  };

  const handleAddProduct = async () => {
    if (
      !newProduct.code ||
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.purchasePrice ||
      !newProduct.sellPrice
    ) {
      console.error("All fields are required");
      setAddError(true);
      return;
    }

    try {
      const processedPurchasePrice = parseFloat(
        newProduct.purchasePrice.replace(",", ".")
      );
      const processedSellPrice = parseFloat(
        newProduct.sellPrice.replace(",", ".")
      );

      const processedProduct = {
        ...newProduct,
        purchasePrice: processedPurchasePrice,
        sellPrice: processedSellPrice,
      };

      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedProduct),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        console.log("Product added:", createdProduct);
        handleCloseAdd();
      } else {
        console.error("Failed to add product. Bad format.");
        setAddError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAddError(true);
    }
  };

  const handleChangePrice = async () => {
    try {
      const price = parseFloat(priceChange.price.replace(",", "."));

      const response = await fetch(
        `http://localhost:8080/api/products/${priceChange.code}/price`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(price),
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log("Price updated:", updatedProduct);
        handleClosePriceChange();
      } else {
        console.error("Failed to update price");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${deleteCode}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Product deleted");
        handleCloseDelete();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <StyledButton
        label="Додати товар"
        backgroundColor="#48BB78"
        hoverColor="#3C9D5E"
        onClick={handleAddClick}
      />
      <StyledButton
        label="Змінити ціну на товар"
        backgroundColor="#3182CE"
        hoverColor="#2c6da1"
        onClick={handlePriceChangeClick}
      />
      <StyledButton
        label="Видалити товар"
        backgroundColor="#E53E3E"
        hoverColor="#c23030"
        onClick={handleDeleteClick}
      />
      <PriceChangePopover
        open={Boolean(priceChangeAnchorEl)}
        anchorEl={priceChangeAnchorEl}
        handleClose={handleClosePriceChange}
        priceChange={priceChange}
        setPriceChange={setPriceChange}
        handleChangePrice={handleChangePrice}
      />
      <DeletePopover
        open={Boolean(deleteAnchorEl)}
        anchorEl={deleteAnchorEl}
        handleClose={handleCloseDelete}
        deleteCode={deleteCode}
        setDeleteCode={setDeleteCode}
        handleDeleteProduct={handleDeleteProduct}
      />
      <AddPopover
        open={Boolean(addAnchorEl)}
        anchorEl={addAnchorEl}
        handleClose={handleCloseAdd}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
        addError={addError}
      />
    </Box>
  );
};

export default ProductActions;
