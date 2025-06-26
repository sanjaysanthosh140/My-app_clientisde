import { useEffect, useState } from "react";
import { data, Navigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Cookies } from "react-cookie";
function ProtectRoute({ children }) {
  let [auth, setAuth] = useState(false);
  let [loading, setloading] = useState(true);
  let [message, setmessage] = useState({
    message: "",
    severity: "",
    open: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const FetchAuth = async () => {
      // console.log('token',token)
      const data = await fetch(
        "http://localhost:4000/user_side/checkauth",
         {
        headers: {
          'Authorization':`${token}`,
          "Content-Type":"application/json"
        },
        credentials:"include",
      });

      setTimeout(() => {
        setloading(false);
      }, 1000);
      const datas = await data.json();

      console.log(datas);

      if (datas.isAuthenticate) {
        setAuth(datas.isAuthenticate);
        console.log(auth);
      }
       
    };

    FetchAuth();
  }, []);


  
 const handelClose = ()=>{
  setmessage({
    open:false
  })
 }
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "primary.main",
              animation: "spin 1s linear infinite",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            Please wait...
          </Typography>
        </Paper>

        <Snackbar
          open={message.open}
          autoHideDuration={3000}
          onClose={handelClose}
        >
          <Alert
            severity={message.severity}
            onClose={handelClose}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      </Box>
    );

  } else if (auth) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}

export default ProtectRoute;
