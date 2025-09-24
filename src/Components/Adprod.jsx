import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  InputAdornment,
  alpha,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { FaCloudUploadAlt, FaRupeeSign, FaBox } from "react-icons/fa";
import keys from "../../keys";
export default function ProductForm() {
    const [proData,setProData] = useState({})
    let [message , setMessage] = useState({
      message:"",
      severity:"",
      open:""
    })
    const handleClose = ()=>{
      setMessage({
        ...message,
        open:false
      })

    }
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const formData = new FormData();
       formData.append('proName', proData.proName);
       formData.append('price', proData.price);
       formData.append('description', proData.description);
       formData.append('image', proData.image);
        console.log("upload",proData)
        console.log("formD",formData)
       const response = await axios.post(`${keys.SERVER_API_CALL}/admin_side/`, formData,{
           headers: {
               'Content-Type': 'multipart/form-data'
           }
       })
       if(response){
          let prodName = response.data.prodName
          prodName?setMessage({
            message:`prosuct ${prodName} added successfully`,
            severity:"success",
            open:true
          }):setMessage({
            message:" failed to add product",
            severity:"error",
            open:true
          })
        
        }

     }
     
    
  return (
    <Container maxWidth="md">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background: "linear-gradient(90deg, #2196f3, #e91e63)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, transparent 70%)",
            top: "20%",
            right: "-100px",
            animation: "rotate 15s linear infinite",
          },
          "@keyframes rotate": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #2196f3, #e91e63)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 4,
          }}
        >
          Add New Product
        </Typography>

        <Box
          component="form"  onSubmit={handleSubmit}
          sx={{
            mt: 3,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              width: "150px",
              height: "150px",
              background:
                "radial-gradient(circle, #2196f3 0%, transparent 70%)",
              top: "-50px",
              right: "-50px",
              opacity: 0.1,
              animation: "float 6s ease-in-out infinite",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              width: "100px",
              height: "100px",
              background:
                "radial-gradient(circle, #e91e63 0%, transparent 70%)",
              bottom: "-30px",
              left: "-30px",
              opacity: 0.1,
              animation: "float 8s ease-in-out infinite",
            },
            "@keyframes float": {
              "0%, 100%": {
                transform: "translateY(0)",
              },
              "50%": {
                transform: "translateY(-20px)",
              },
            },
          }}
        >
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            margin="normal"
            name ='proName'
            required={true}
            defaultValue={proData.proName}
            onChange={(e)=>setProData({...proData,proName:e.target.value})}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaBox color="#666" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                borderRadius: "12px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  "& fieldset": {
                    borderColor: alpha("#2196f3", 0.6),
                    boxShadow: "0 4px 20px rgba(33, 150, 243, 0.1)",
                  },
                },
                "&.Mui-focused": {
                  transform: "translateY(-2px)",
                  "& fieldset": {
                    borderWidth: "2px",
                    boxShadow: "0 4px 20px rgba(33, 150, 243, 0.15)",
                  },
                },
              },
              "& .MuiInputBase-input": {
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(233, 30, 99, 0.1))",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                },
                "&:focus::after": {
                  opacity: 1,
                },
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: "10px",
              height: "10px",
              background: "#2196f3",
              borderRadius: "50%",
              right: "10%",
              top: "20%",
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)", opacity: 0.5 },
                "50%": { transform: "scale(1.5)", opacity: 0.2 },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "15px",
              height: "15px",
              background: "#e91e63",
              borderRadius: "50%",
              left: "5%",
              bottom: "15%",
              animation: "pulse 3s ease-in-out infinite",
            }}
          />

          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            margin="normal"
            type="number"
            name='price'
            required={true}
            defaultValue={proData.price}
            onChange={(e)=>setProData({...proData,price:e.target.value})}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaRupeeSign color="#666" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover fieldset": {
                  borderColor: alpha("#2196f3", 0.6),
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            name='description'
            required={true}
            defaultValue={proData.description}
            onChange={(e)=>setProData({...proData,description:e.target.value})}
            multiline
            rows={4}

            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover fieldset": {
                  borderColor: alpha("#2196f3", 0.6),
                },
              },
            }}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              height: "56px",
              borderRadius: "12px",
              borderWidth: "2px",
              borderStyle: "dashed",
              "&:hover": {
                borderWidth: "2px",
                borderStyle: "dashed",
                background: alpha("#2196f3", 0.04),
              },
            }}
            startIcon={<FaCloudUploadAlt size={24} />}
          >
            Upload Product Image
            <input type="file" name="image" required={true}
            onChange={(e)=>setProData({...proData,image:e.target.files[0]})}
            hidden accept="image/*"
            />
          </Button>
           
          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            sx={{
              mt: 3,
              height: "56px",
              borderRadius: "12px",
              background: "linear-gradient(45deg, #2196f3, #e91e63)",
              "&:hover": {
                background: "linear-gradient(45deg, #1976d2, #d81b60)",
              },
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            Add Product
          </Button>
          <Snackbar open={message.open} autoHideDuration={3000} onClose={handleClose}>

            <Alert open={message.open} onClose={handleClose} severity={message.severity}>
                 {message.message}
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
    </Container>
  );
}
