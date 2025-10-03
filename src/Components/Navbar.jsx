import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { FaBars, FaHeart, FaHome, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <FaHome /> },
    { text: "Wish", path: "/Wish", icon: <FaHeart /> },
    { text: "Login", path: "/login", icon: <FaSignInAlt /> },
    { text: "Signup", path: "/signup", icon: <FaUserPlus /> },
  ];

  const drawer = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(145deg, #667eea 0%, #764ba2 100%)",
        pt: 2,
      }}
    >
      <List sx={{ px: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={item.path}
            sx={{
              mb: 1,
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                transform: "translateX(10px)",
              },
            }}
          >
            <Box sx={{ mr: 2, color: "white", display: "flex", alignItems: "center" }}>
              {item.icon}
            </Box>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                color: "white",
                "& .MuiListItemText-primary": {
                  fontWeight: "600",
                  fontSize: "1.1rem",
                }
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 1 }}>
        {isMobile && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ 
                mr: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }
              }}
              onClick={toggleDrawer(true)}
            >
              <FaBars />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{ 
                "& .MuiDrawer-paper": { 
                  width: { xs: "75%", sm: "300px" },
                  background: "transparent",
                } 
              }}
            >
              {drawer}
            </Drawer>
          </>
        )}
        
        {/* Brand/Logo */}
        <Typography 
          variant="h5" 
          component={Link}
          to="/"
          sx={{ 
            flexGrow: 1,
            fontWeight: "800",
            fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
            color: "white",
            textDecoration: "none",
            letterSpacing: "1px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
            }
          }}
        >
          Stack-Boat
        </Typography>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  textTransform: "capitalize",
                  px: 2.5,
                  py: 1,
                  borderRadius: "25px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
