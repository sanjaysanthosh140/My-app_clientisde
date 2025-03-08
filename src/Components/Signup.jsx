import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  IconButton
}from "@mui/material";
import { styled } from "@mui/material/styles";
 import { useNavigate } from "react-router-dom";
import  { Cookies } from "react-cookie"
import axios from 'axios'
const DecorativeImage = styled("img")({
  position: "absolute",
  width: "60px",
  height: "60px",
  animation: "float 3s ease-in-out infinite",
  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
    "100%": { transform: "translateY(0px)" },
  },
});

const FormContainer = styled(Paper)({
  padding: "2rem",
  width: "100%",
  maxWidth: "400px",
  position: "relative",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  margin: "0 auto", // Add this line to center horizontally
  display: "flex", // Add this line
  flexDirection: "column", // Add this line
  alignItems: "center", // Add this line
});

const SignupPage = () => {
  const cookies = new Cookies();
  const [massage,setmassage]=useState({
    message:"",
    severity:"",
    open:false
  })
 const navigate = useNavigate();
    const [formData,setfromData]= useState({
       name:"",
       email:"",
       password:""
    })

    const handleChange =(e) =>{
        setfromData({
            ...formData,
            [e.target.name]:e.target.value

        })
       
        
    }
     const handleSubmit = async (e) => {
   e.preventDefault()
   console.log(formData)
   if (formData.name && formData.email && formData.password) {
   } else {
     setmassage({
       message: "plz fill the form",
       severity: 'error',
       open: true
     })
   }
   const result = await axios.post("https://myapp-server-side-pqkd.onrender.com/user_side", formData)
   let name = result.data.data
   cookies.set("userName",name)
   console.log(name)
  if(name){
    navigate("/prod")
  }

   if(result.data.token){
     localStorage.setItem("token",result.data.token)
   }else{
    setmassage({
       message: "this user already exist",
       severity: 'error',
       open: true
     })
   }
}

 const handleGoogleSignup = async() => {
  const result = window.location.href = 'https://myapp-server-side-pqkd.onrender.com/user_side/oauth/google';
  console.log(result,"ressult")
  }

 const handleGithubSignup = async() => {
   window.location.href = 'https://myapp-server-side-pqkd.onrender.com/user_side/github/oauth';
 }


const handleclose=()=>{
  setmassage({
    ...massage,
    open: false
  })
}
    
    
    
  return (
    <Box
    
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Images */}
     
     
      <DecorativeImage
        src="https://cdn-icons-png.flaticon.com/128/2933/2933116.png" 
        style={{ top: "10%", left: "15%" }}
      />
      <DecorativeImage
        src="https://cdn-icons-png.flaticon.com/128/4090/4090458.png" // Gold coin icon
        style={{ top: "20%", right: "20%", animationDelay: "1s" }}
      />
      <DecorativeImage
        src="https://cdn-icons-png.flaticon.com/128/2489/2489756.png" // Dollar bill icon
        style={{ bottom: "15%", left: "20%", animationDelay: "2s" }}
      />
      <DecorativeImage
        src="https://cdn-icons-png.flaticon.com/128/2933/2933267.png" // Stack of coins icon
        style={{ bottom: "20%", right: "15%", animationDelay: "1.5s" }}
      />
      <DecorativeImage
  src="https://cdn-icons-png.flaticon.com/128/438/438526.png" // Dollar symbol with wings icon
  style={{ top: '50%', left: '50%', animationDelay: '0.5s' }}
/>

      

      <Container maxWidth="sm" 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <FormContainer elevation={0}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              mb: 4,
            }}
          >
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Full Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#2196F3",
                  },
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#2196F3",
                  },
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#2196F3",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                height: 48,
                borderRadius: "24px",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Box sx={{ 
  mt: 3, 
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 4 
}}>
  <IconButton
    sx={{
      border: '1px solid #ddd',
      padding: 2,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        borderColor: '#2196F3',
        bgcolor: 'rgba(33, 150, 243, 0.04)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }
    }}
    onClick={handleGoogleSignup}
    >
    <FcGoogle size={24} />
  </IconButton>
  
    <IconButton
    sx={{
      border: '1px solid #ddd',
      padding: 2,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        borderColor: '#2196F3',
        bgcolor: 'rgba(33, 150, 243, 0.04)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }

    }}
    onClick={handleGithubSignup}
  >
    <BsGithub size={24} />
  </IconButton>
  
       </Box>
        </FormContainer>
        <Snackbar open={massage.open} autoHideDuration={3000} onClose={handleclose}>
          <Alert severity={massage.severity} onClose={handleclose} sx={{ width: '100%' }}>
            {massage.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default SignupPage;
