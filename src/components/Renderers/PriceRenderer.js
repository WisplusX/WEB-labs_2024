import React from "react";

const PriceRenderer = ({ value }) => {
  const formattedPrice = `${value.toFixed(2).replace(".", ",")} грн`;
  return <div>{formattedPrice}</div>;
};

export default PriceRenderer;
