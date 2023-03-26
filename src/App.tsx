import { Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
import Dashboard from "@/pages/dashboard";
import Sales from "@/pages/Sales";
import { themeSettings } from "./theme";
import Login from "./pages/Login";
import RequireAuth from "./utils/RequireAuth";
import Layout from "./layouts/Layout";
import EscapeLogin from "./utils/EscapeLogin";
import ProductPage from "./pages/product";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100vh">
            <Box
              width="100%"
              height="100%"
              padding={{ xs: "1rem 1rem 2rem 1rem", sm: "1rem 2rem 4rem 2rem" }}
            >
              <Routes>
                <Route element={<RequireAuth />}>
                  {/* Protected Routes */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/sales" element={<Sales />}></Route>
                    <Route
                      path="/product-list"
                      element={<ProductPage />}
                    ></Route>
                  </Route>
                </Route>
                {/* Public Route */}
                <Route element={<EscapeLogin />}>
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
