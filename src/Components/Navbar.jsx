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
} from "@mui/material";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaHeart } from "react-icons/fa"; //
//  import  { Cookies } from "react-cookie"
function Navbar() {
  // const cookie = new Cookies();
  // const userName = cookie.get("userName");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const drawer = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ backgroundColor: "lightblue", height: "100%" }}
    >
      <List>
        <ListItem buttonbase="value" component={Link} to="/prod">
          <ListItemText primary="products" sx={{ color: "white" }} />
        </ListItem>
        <ListItem buttonbase="value" component={Link} to="/signup">
          <ListItemText primary="Signup" sx={{ color: "white" }} />
        </ListItem>
        <ListItem buttonbase="value" component={Link} to="/cart">
          <ListItemText primary="cart" sx={{ color: "white" }} />
        </ListItem>
        <ListItem buttonbase="value" component={Link} to="/Wish">
          <ListItemText primary="Wish" sx={{ color: "white" }} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "lightblue" }}>
      <Toolbar>
        {isMobile && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <FaBars />
            </IconButton>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{ "& .MuiDrawer-paper": { backgroundColor: "lightblue" } }}
            >
              {drawer}
            </Drawer>
          </>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        {!isMobile && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/Cart">
              Cart
            </Button>
            <Button color="inherit" component={Link} to="/Wish">
             Wish
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
