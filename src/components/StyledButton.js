import React, { useState } from "react";
import { Button, Popover, Typography, TextField, Box } from "@mui/material";

const StyledButton = ({ label, backgroundColor, hoverColor, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        boxShadow: "none",
        backgroundColor,
        textTransform: "uppercase",
        borderRadius: 0,
        height: "30px",
        "&:hover": {
          backgroundColor: hoverColor,
          boxShadow: "none",
        },
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

const PriceChangePopover = ({
  open,
  anchorEl,
  handleClose,
  priceChange,
  setPriceChange,
  handleChangePrice,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPriceChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, maxWidth: "300px" }}>
        <Typography variant="h4" sx={{ fontSize: "14px" }}>
          Змінити ціну на товар
        </Typography>
        <TextField
          label="Артикул"
          fullWidth
          variant="standard"
          name="code"
          value={priceChange.code}
          onChange={handleInputChange}
          sx={{ mt: 1, fontSize: "14px" }}
        />
        <TextField
          label="Нова ціна"
          fullWidth
          variant="standard"
          name="price"
          value={priceChange.price}
          onChange={handleInputChange}
          sx={{ mt: 1, fontSize: "14px" }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            boxShadow: "none",
            backgroundColor: "#3182CE",
            textTransform: "uppercase",
            borderRadius: 0,
            height: "30px",
            "&:hover": {
              backgroundColor: "#2c6da1",
              boxShadow: "none",
            },
          }}
          onClick={handleChangePrice}
        >
          Підтвердити зміну
        </Button>
      </Box>
    </Popover>
  );
};

const DeletePopover = ({
  open,
  anchorEl,
  handleClose,
  deleteCode,
  setDeleteCode,
  handleDeleteProduct,
}) => {
  const handleInputChange = (e) => {
    setDeleteCode(e.target.value);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, maxWidth: "300px" }}>
        <Typography variant="h4" sx={{ fontSize: "14px" }}>
          Видалити товар з каталогу
        </Typography>
        <TextField
          label="Артикул"
          fullWidth
          variant="standard"
          value={deleteCode}
          onChange={handleInputChange}
          sx={{ mt: 1, borderRadius: 0, fontSize: "14px" }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            boxShadow: "none",
            backgroundColor: "#E53E3E",
            textTransform: "uppercase",
            borderRadius: 0,
            height: "30px",
            "&:hover": {
              backgroundColor: "#c23030",
              boxShadow: "none",
            },
          }}
          onClick={handleDeleteProduct}
        >
          Підтвердити видалення
        </Button>
      </Box>
    </Popover>
  );
};

const AddPopover = ({
  open,
  anchorEl,
  handleClose,
  newProduct,
  setNewProduct,
  handleAddProduct,
  addError,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, maxWidth: "500px" }}>
        <Typography variant="h4" sx={{ fontSize: "14px" }}>
          Додати товар до каталогу
        </Typography>
        <TextField
          label="Артикул"
          fullWidth
          required
          variant="standard"
          name="code"
          value={newProduct.code}
          onChange={handleInputChange}
          sx={{ mt: 1, borderRadius: 0 }}
        />
        <TextField
          label="Найменування"
          fullWidth
          required
          variant="standard"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          sx={{ mt: 1, borderRadius: 0 }}
        />
        <TextField
          select
          label="Категорія"
          fullWidth
          required
          variant="standard"
          SelectProps={{
            native: true,
          }}
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          sx={{ mt: 1, borderRadius: 0 }}
        >
          <option value="FOOD">Продукти</option>
          <option value="CHEMICALS">Побутова хімія</option>
          <option value="HOME">Для дому</option>
          <option value="OFFICE">Канцелярія</option>
        </TextField>
        <TextField
          label="Ціна закупівлі"
          fullWidth
          required
          variant="standard"
          name="purchasePrice"
          value={newProduct.purchasePrice}
          onChange={handleInputChange}
          sx={{ mt: 1, borderRadius: 0 }}
        />
        <TextField
          label="Ціна продажу"
          fullWidth
          required
          variant="standard"
          name="sellPrice"
          value={newProduct.sellPrice}
          onChange={handleInputChange}
          sx={{ mt: 1, borderRadius: 0 }}
        />
        {addError && (
          <Box sx={{ mt: 2, p: 2, bgcolor: "#FED7D7" }}>
            <Typography variant="body1" color="error">
              <b>Упс... Схоже виникла помилка. Перевірте введені дані.</b>
              <br />
              Всі поля обовʼязкові.
              <br />
              — Артикул: 6 символів, унікальний
              <br />
              — Найменування: до 255 символів
              <br />— Ціна закупівлі і продажу: формат "10.50" або "10"
            </Typography>
          </Box>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            boxShadow: "none",
            backgroundColor: "#48BB78",
            textTransform: "uppercase",
            borderRadius: 0,
            height: "30px",
            "&:hover": {
              backgroundColor: "#3C9D5E",
              boxShadow: "none",
            },
          }}
          onClick={handleAddProduct}
        >
          Додати товар
        </Button>
      </Box>
    </Popover>
  );
};

const ProductPurchasePopover = ({
  open,
  anchorEl,
  handleClose,
  onPurchase,
}) => {
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");

  const handlePurchaseClick = () => {
    onPurchase(code, amount);
    handleClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, maxWidth: "300px" }}>
        <Typography variant="h4" sx={{ fontSize: "14px" }}>
          Закупити товар
        </Typography>
        <TextField
          label="Артикул"
          fullWidth
          variant="standard"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          sx={{ mt: 1, fontSize: "14px" }}
        />
        <TextField
          label="Кількість"
          fullWidth
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mt: 1, fontSize: "14px" }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            boxShadow: "none",
            backgroundColor: "#3182CE",
            textTransform: "uppercase",
            borderRadius: 0,
            height: "30px",
            "&:hover": {
              backgroundColor: "#2c6da1",
              boxShadow: "none",
            },
          }}
          onClick={handlePurchaseClick}
        >
          Закупити товар
        </Button>
      </Box>
    </Popover>
  );
};

const WaterSellPopover = ({ open, anchorEl, handleClose, onSell }) => {
  const [quantity, setQuantity] = useState("");

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSell = () => {
    onSell(quantity);
    handleClose();
    setQuantity("");
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, maxWidth: "300px" }}>
        <Typography variant="h4" sx={{ fontSize: "14px" }}>
          Відмітити продаж води
        </Typography>
        <TextField
          label="Кількість"
          fullWidth
          variant="standard"
          value={quantity}
          onChange={handleQuantityChange}
          sx={{ mt: 1, fontSize: "14px" }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            boxShadow: "none",
            backgroundColor: "#48BB78",
            textTransform: "uppercase",
            borderRadius: 0,
            height: "30px",
            "&:hover": {
              backgroundColor: "#3C9D5E",
              boxShadow: "none",
            },
          }}
          onClick={handleSell}
        >
          Відмітити продаж
        </Button>
      </Box>
    </Popover>
  );
};

const WaterPurchasePopover = ({
  open,
  anchorEl,
  handleClose,
  maxWaterLevelLiters,
  currentWaterLevelLiters,
  onPurchase,
}) => {
  const [quantity, setQuantity] = useState("");

  const handleMaxClick = () => {
    const maxQuantity = maxWaterLevelLiters - currentWaterLevelLiters;
    setQuantity(maxQuantity.toString());
  };

  const handleOrderClick = () => {
    onPurchase(quantity);
    handleClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, maxWidth: "300px" }}>
        <Typography variant="h4" sx={{ fontSize: "14px" }}>
          Замовити доставку води
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            label="Кількість"
            fullWidth
            variant="standard"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ mt: 1, fontSize: "14px" }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleMaxClick}
            sx={{
              mt: 2,
              boxShadow: "none",
              backgroundColor: "#3182CE",
              textTransform: "uppercase",
              height: "30px",
              width: "auto",
              "&:hover": {
                backgroundColor: "#2c6da1",
                boxShadow: "none",
              },
            }}
          >
            MAX
          </Button>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={handleOrderClick}
          sx={{
            mt: 2,
            boxShadow: "none",
            backgroundColor: "#3182CE",
            textTransform: "uppercase",
            borderRadius: 0,
            height: "30px",
            "&:hover": {
              backgroundColor: "#2c6da1",
              boxShadow: "none",
            },
          }}
        >
          Замовити
        </Button>
      </Box>
    </Popover>
  );
};

export default WaterPurchasePopover;

const ProductSellPopover = ({ open, anchorEl, handleClose, onSellProduct }) => {
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");

  const handleSell = () => {
    onSellProduct(code, amount);
    setCode("");
    setAmount("");
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, maxWidth: "300px" }}>
        <Typography variant="h4" sx={{ fontSize: "14px" }}>
          Відмітити продаж товару
        </Typography>
        <TextField
          label="Артикул"
          fullWidth
          variant="standard"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          sx={{ mt: 1, fontSize: "14px" }}
        />
        <TextField
          label="Кількість"
          fullWidth
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mt: 1, fontSize: "14px" }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            boxShadow: "none",
            backgroundColor: "#48BB78",
            textTransform: "uppercase",
            borderRadius: 0,
            height: "30px",
            "&:hover": {
              backgroundColor: "#3C9D5E",
              boxShadow: "none",
            },
          }}
          onClick={handleSell}
        >
          Відмітити продаж
        </Button>
      </Box>
    </Popover>
  );
};

const WaterSellPriceChangePopover = ({
  open,
  anchorEl,
  handleClose,
  onChangePrice,
}) => {
  const [newPrice, setNewPrice] = useState("");

  const handleChangeClick = () => {
    onChangePrice(newPrice);
    handleClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, maxWidth: "300px" }}>
        <Typography variant="h4" sx={{ fontSize: "14px" }}>
          Змінити ціну продажу
        </Typography>
        <TextField
          label="Нова ціна"
          fullWidth
          variant="standard"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          sx={{ mt: 1, fontSize: "14px" }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleChangeClick}
          sx={{
            mt: 2,
            boxShadow: "none",
            backgroundColor: "#3182CE",
            textTransform: "uppercase",
            borderRadius: 0,
            height: "30px",
            "&:hover": {
              backgroundColor: "#2c6da1",
              boxShadow: "none",
            },
          }}
        >
          Змінити
        </Button>
      </Box>
    </Popover>
  );
};

export {
  StyledButton,
  PriceChangePopover,
  DeletePopover,
  AddPopover,
  ProductPurchasePopover,
  ProductSellPopover,
  WaterPurchasePopover,
  WaterSellPopover,
  WaterSellPriceChangePopover,
};
