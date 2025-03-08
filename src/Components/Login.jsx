import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
function Login() {
  const messaging = (message) => {
    setmessage({
      message: message,
      severity: "warning",
      open: true,
    });
  };

  let [islogin, setislogin] = useState(false);
  let [message, setmessage] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://myapp-server-side-pqkd.onrender.com/user_side/oauth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "https://myapp-server-side-pqkd.onrender.com/user_side/github/oauth";
  };
const hadleClose =() =>{
  setmessage({
    ...message,
    open:false
  })
}
  const handleSubit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    axios
      .post("https://myapp-server-side-pqkd.onrender.com/user_side/login", formData)
      .then((response) => {
        console.log("login",response.data);

        if (response.data.login) {
          let token = response.data.token;
          localStorage.setItem("token", token);
          setislogin(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          setmessage({
            message: error.response.data.message||error.response.status||error.response.headers||"username or password is wrong",
           severity: "error",
           open: true,
         });
          console.log(error.response.data.message);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  if (islogin) {
    return <Navigate to="/prod" />;
  }
  // console.log(formData)
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "80px",
          height: "80px",
          backgroundImage:
            'url("https://img.icons8.com/clouds/100/000000/cloud.png")',
          backgroundSize: "contain",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "60px",
          height: "60px",
          backgroundImage:
            'url("https://img.icons8.com/clouds/100/000000/star.png")',
          backgroundSize: "contain",
          animation: "float 5s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: "70px",
          height: "70px",
          backgroundImage:
            'url("https://img.icons8.com/clouds/100/000000/sun.png")',
          backgroundSize: "contain",
          animation: "float 7s ease-in-out infinite",
        }}
      />

      {/* Main Login Form */}
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 2,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: 700,
            background: "linear-gradient(45deg, #2196F3, #21CBF3)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Welcome Back
        </Typography>

        <Box component="form" onSubmit={handleSubit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.5,
              background: "linear-gradient(45deg, #2196F3, #21CBF3)",
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 6px 20px rgba(33, 150, 243, 0.3)",
              },
            }}
          >
            Sign In
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mt: 3,
              mb: 2,
            }}
          >
            <IconButton
              sx={{
                border: "2px solid #ddd",
                padding: 2,
                transition: "all 0.4s ease",
                background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
                boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
                "&:hover": {
                  transform: "translateY(-5px) rotate(5deg)",
                  borderColor: "#2196F3",
                  bgcolor: "rgba(33, 150, 243, 0.04)",
                  boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={28} />
            </IconButton>

            <IconButton
              sx={{
                border: "2px solid #ddd",
                padding: 2,
                transition: "all 0.4s ease",
                background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
                boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
                "&:hover": {
                  transform: "translateY(-5px) rotate(-5deg)",
                  borderColor: "#2196F3",
                  bgcolor: "rgba(33, 150, 243, 0.04)",
                  boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
              onClick={handleGithubLogin}
            >
              <BsGithub size={28} />
            </IconButton>
          </Box>

          <Typography
            variant="body1"
            align="center"
            sx={{
              mt: 3,
              color: "#666",
              "&:hover": {
                color: "#2196F3",
                cursor: "pointer",
              },
            }}
          >
            Don't have an account? Sign Up
          </Typography>
        </Box>
      </Paper>
      <Snackbar open={message.open} autoHideDuration={6000} onClose={hadleClose}>
        <Alert open={message.open} severity={ message.severity} onClose={hadleClose} sx={{ width: '100%' }}>
            {message.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
