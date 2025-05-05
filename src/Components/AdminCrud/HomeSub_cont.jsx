import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { FiUpload, FiSave, FiX } from "react-icons/fi";
import axios from "axios";

const HomeSub_cont = () => {
  const [formData, setformData] = useState({
    prodTitle1: "",
    prodDesc1: "",
    prodTitle2: "",
    prodDesc2: "",
    prodTitle3: "",
    prodDesc3: "",
    prodTitle4: "",
    prodDesc4: "",
    prodImg: [],
  });
  let sendData = new FormData();
  const textchange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a new array by copying the existing prodImg array
      const newProdImg = [...formData.prodImg];

      // Add the new file to the array
      // This will simply append each new file to the array
      newProdImg.push(file);

      // Update formData with the new array
      setformData({
        ...formData,
        prodImg: newProdImg,
      });

      console.log("File added:", file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    sendData.append("prodTitle1", formData.prodTitle1);
    sendData.append("prodDesc1", formData.prodDesc1);
    sendData.append("prodTitle2",formData.prodTitle2);
    sendData.append("prodDesc2",formData.prodDesc2);
    sendData.append("prodTitle3",formData.prodTitle3);
    sendData.append("prodDesc3",formData.prodDesc3);
    sendData.append("prodTitle4",formData.prodTitle4);
    sendData.append("prodDesc4",formData.prodDesc4);

    formData.prodImg.forEach((file) => {
      sendData.append("prodImg", file); // Use 'images' as the field name
    });
    //console.log(sendData);
    axios
      .post("http://localhost:4000/admin_side/sub_multyImg", sendData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response) {
          setformData({
            ...formData,
            prodTitle: "",
            prodDesc: "",
            prodImg: [],
          });

          document.querySelectorAll('input[type="file"]').forEach((input) => {
            input.value = "";
          });
          document.querySelectorAll("#texts").forEach((input) => {
            input.value = "";
          });
        }

       
      });
  };
  return (
    <>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Product Information
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Text Inputs */}
            <Grid item xs={12} sm={6}>
              <TextField
                id="texts"
                fullWidth
                label="stack_name"
                variant="outlined"
                name="prodTitle1"
                onChange={textchange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="texts"
                fullWidth
                label="stack_Description"
                variant="outlined"
                name="prodDesc1"
                onChange={textchange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="texts"
                fullWidth
                label="stack_name"
                variant="outlined"
                name="prodTitle2"
                onChange={textchange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="texts"
                fullWidth
                label="stack_Description"
                variant="outlined"
                name="prodDesc2"
                onChange={textchange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="texts"
                fullWidth
                label="stack_name"
                variant="outlined"
                name="prodTitle3"
                onChange={textchange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="texts"
                fullWidth
                label="stack_Description"
                variant="outlined"
                name="prodDesc3"
                onChange={textchange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="texts"
                fullWidth
                label="stack_name"
                variant="outlined"
                name="prodTitle4"
                onChange={textchange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="texts"
                fullWidth
                label="stack_Description"
                variant="outlined"
                name="prodDesc4"
                onChange={textchange}
                required
              />
            </Grid>

            {/* File Upload Inputs */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Product Images
              </Typography>
            </Grid>

            {/* File Upload 1 */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="file-upload-1" shrink>
                  Main Image
                </InputLabel>
                <Box
                  sx={{
                    mt: 2,
                    border: "1px dashed #ccc",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  <Input
                    id="file-upload-1"
                    type="file"
                    sx={{ display: "none" }}
                    name="prodImg"
                    onChange={(e) => fileChange(e)}
                  />
                  <label htmlFor="file-upload-1">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<FiUpload />}
                      fullWidth
                    >
                      Upload Image 1
                    </Button>
                  </label>
                </Box>
              </FormControl>
            </Grid>

            {/* File Upload 2 */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="file-upload-2" shrink>
                  Secondary Image
                </InputLabel>
                <Box
                  sx={{
                    mt: 2,
                    border: "1px dashed #ccc",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  <Input
                    id="file-upload-2"
                    type="file"
                    sx={{ display: "none" }}
                    name="prodImg"
                    onChange={(e) => fileChange(e)}
                  />
                  <label htmlFor="file-upload-2">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<FiUpload />}
                      fullWidth
                    >
                      Upload Image 2
                    </Button>
                  </label>
                </Box>
              </FormControl>
            </Grid>

            {/* File Upload 3 */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="file-upload-3" shrink>
                  Additional Image
                </InputLabel>
                <Box
                  sx={{
                    mt: 2,
                    border: "1px dashed #ccc",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  <Input
                    id="file-upload-3"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={(e) => fileChange(e)}
                    name="prodImg"
                  />
                  <label htmlFor="file-upload-3">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<FiUpload />}
                      fullWidth
                    >
                      Upload Image 3
                    </Button>
                  </label>
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="file-upload-3" shrink>
                  Additional Image2
                </InputLabel>
                <Box
                  sx={{
                    mt: 2,
                    border: "1px dashed #ccc",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  <Input
                    id="file-upload-3"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={(e) => fileChange(e)}
                    name="prodImg"
                  />
                  <label htmlFor="file-upload-3">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<FiUpload />}
                      fullWidth
                    >
                      Upload Image 4
                    </Button>
                  </label>
                </Box>
              </FormControl>
            </Grid>

            {/* Action Buttons */}
            <Grid
              item
              xs={12}
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button variant="outlined" color="error" startIcon={<FiX />}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FiSave />}
                type="submit"
              >
                Save Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default HomeSub_cont;
