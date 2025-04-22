import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Stack,
  Snackbar,
  Alert
} from "@mui/material";
import {
  MdUpdate,
  MdProductionQuantityLimits,
  MdCloudUpload,
} from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";

function UpdateProd(prod) {
  
  let [preview, setpreview] = useState(null);
  console.log(prod.prodData);
  let [updateData, setUpdateData] = useState({
    ...prod.prodData[0],
  });


  
  let [message, setmessage] = useState({
    message:"",
    severity:"",
    open:false
  });

  const handleClose =()=>{
    setmessage({
      ...setmessage,
      open:false
    })
    prod.prodreupdate()
  }
  console.log("setup", updateData.prodImage);
  const handleSubmit =async (e) => {
    e.preventDefault();
    //let formData = new FormData();
    //console.log(updateData);
    // formData.append("prodName",updateData.prodName);
    // formData.append("prodDescription",updateData.prodDescription);
    // formData.append("prodPrice",updateData.prodPrice);
    // formData.append("prodImage",updateData.prodImage);
   await axios.post("https://myapp-server-side-pqkd.onrender.com/admin_side/update_product",updateData,{
      headers: {
        'Content-Type': 'multipart/form-data'
    }
    }).then((res)=>{
      console.log(res.data)
             setmessage({
              message:"produt is updated successfully",
              severity:"success",
              open:true
             })
    })
  };
  
  const handleImageUpload = async (e) => {
    const file = Array.from(e.target.files);
    setUpdateData({...updateData,image:e.target.files[0]})
    const previews = file.map((file) => URL.createObjectURL(file));
    setpreview(previews);
    console.log('data',updateData);
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            transform: "translateY(-4px)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <MdProductionQuantityLimits size={32} color="#1976d2" />
              <Typography variant="h4" component="h1" color="primary">
                Update Product
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              name="prodName"
              value={updateData.prodName}
              onChange={(e) =>
                setUpdateData({ ...updateData, prodName: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              name="prodDescription"
              value={updateData.prodDescription}
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  prodDescription: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              label="Price"
              type="number"
              variant="outlined"
              name="prodPrice"
              value={updateData.prodPrice}
              onChange={(e) =>
                setUpdateData({ ...updateData, prodPrice: e.target.value })
              }
            />

            <Box>
              <input
                type="file"
                accept="image/*"
                name="prodImage"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="upload-button"
              />
              <label htmlFor="upload-button">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<MdCloudUpload />}
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                      transform: "scale(1.02)",
                    },
                    transition: "all 0.2s ease-in-out",
                    padding: "10px 20px",
                  }}
                >
                  Choose Image
                </Button>
              </label>

              {preview ? (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "90px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={`https://myapp-server-side-pqkd.onrender.com/uploads/${updateData.prodImage.replace(
                      "uploads",
                      ""
                    )}`}
                    alt="Preview"
                    style={{
                      width: "90px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<MdUpdate />}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  transform: "scale(1.02)",
                  transition: "all 0.2s ease-in-out",
                },
              }}
            >
              Update Product
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Snackbar open={message.open} onClose={handleClose} autoHideDuration={3000}>
        <Alert open={message.open} onClose={handleClose} severity={message.severity}>
              {message.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UpdateProd;
