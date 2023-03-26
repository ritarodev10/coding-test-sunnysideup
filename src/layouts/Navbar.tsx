import FlexBetween from "@/components/FlexBetween";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const location = useLocation();

  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  const handleSignOut = () => {
    localStorage.clear();
  };

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0" color={palette.grey[300]}>
      <Link
        to="/"
        style={{
          color: "inherit",
          textDecoration: "inherit",
        }}
      >
        <FlexBetween
          gap="0.75rem"
          sx={{ "&:hover": { color: palette.primary[100] } }}
        >
          <BeenhereIcon sx={{ fontSize: "28px" }} />
          <Typography variant="h4" fontSize="16px" color="inherit">
            CodeTest
          </Typography>
        </FlexBetween>
      </Link>
      <FlexBetween gap={{ xs: "0.5rem", sm: "2rem" }}>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/dashboard"
            style={{
              color: selected === "/dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/product-list"
            style={{
              color:
                selected === "/product-list" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Products
          </Link>
        </Box>
        <Box>
          <Link to="/login">
            <IconButton onClick={handleSignOut}>
              <ExitToAppIcon sx={{ color: palette.secondary.main }} />
            </IconButton>
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
