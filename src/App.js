import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageProductsPage from "./components/ManageProductsPage/ManageProductsPage";
import PurchaseProductsPage from "./components/PurchaseProductsPage/PurchaseProductsPage";
import SellProductsPage from "./components/SellProductsPage/SellProductsPage";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import WaterSellingPage from "./components/WaterSellingPage/WaterSellingPage";
import AnalyticsPage from "./components/AnalyticsPage/AnalyticsPage";

// Определение темы
const theme = createTheme({
  typography: {
    fontFamily: "Open Sans",
    fontSize: 12,
  },
  shape: {
    borderRadius: 0,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          {/* Wrap Routes here */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/manage" element={<ManageProductsPage />} />
          <Route path="/purchase" element={<PurchaseProductsPage />} />
          <Route path="/sell" element={<SellProductsPage />} />
          <Route path="/water" element={<WaterSellingPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
