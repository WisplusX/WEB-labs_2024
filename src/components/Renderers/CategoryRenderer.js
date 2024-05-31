import React from "react";
import Box from "@mui/material/Box";

const CategoryRenderer = ({ value }) => {
  const backgroundColor = (() => {
    switch (value) {
      case "FOOD":
        return "#C6F6D5";
      case "CHEMICALS":
        return "#E9D8FD";
      case "OFFICE":
        return "#FEFCBF";
      case "HOME":
        return "#C4F1F9";
      default:
        return "transparent";
    }
  })();
  const textColor = (() => {
    switch (value) {
      case "FOOD":
        return "#25855A";
      case "CHEMICALS":
        return "#6B46C1";
      case "OFFICE":
        return "#B7791F";
      case "HOME":
        return "#00A3C4";
      default:
        return "black";
    }
  })();
  const name = (() => {
    switch (value) {
      case "FOOD":
        return "Продукти";
      case "CHEMICALS":
        return "Побутова хімія";
      case "OFFICE":
        return "Канцелярія";
      case "HOME":
        return "Для дому";
      default:
        return "Різне";
    }
  })();
  return (
    <Box
      sx={{
        px: 2,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "30px",
        backgroundColor,
        marginRight: "4px",
      }}
    >
      <span
        style={{
          color: textColor,
          fontSize: "10px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {name}
      </span>
    </Box>
  );
};

export default CategoryRenderer;
