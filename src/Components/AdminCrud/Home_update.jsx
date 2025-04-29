import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { FiUpload, FiSave, FiHome } from "react-icons/fi";
import axios from "axios";

const Home_update = ({ productData, updategain }) => {
  const sendfile = new FormData();

  const [updata, setupdata] = useState({
    id:"",
    description: "",
    home_Image: "",

  });
  console.log("paraeters", productData, updategain);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  useEffect(() => {
    setupdata({
      id:productData[0]._id,
      description: productData[0].description,
      home_Image: productData[0].home_Image,

    });
    console.log("updata", updata);
    try {
      fetch("http://localhost:4000/admin_side/get_home_cont", {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [productData]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
    setupdata({
      ...updata,
      home_Image:event.target.files[0],
    });
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleTextChange = (e) => {
    try {
      setupdata({
        ...updata,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    sendfile.append("id",updata.id);
    sendfile.append("description", updata.description);
    sendfile.append("home_Image", updata.home_Image);
    console.log("send_File", sendfile);
    console.log("updatd data", updata);
    try {
      await axios.post("http://localhost:4000/admin_side/update_home_data",sendfile,{
        headers: {
          "Content-Type":"multipart/form-data"
        }
      }).then((res)=>{
        console.log(res);
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
          <FiHome size={24} style={{ marginRight: "10px" }} />
          <Typography variant="h5" component="h1">
            Update Home Content
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label="Home Content Text"
                variant="outlined"
                value={updata.description}
                multiline
                rows={4}
                placeholder="Enter the text content for home page"
                name="description"
                onChange={handleTextChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Home Image
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<FiUpload />}
                      sx={{ mr: 2 }}
                    >
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                        name="image"
                      />
                    </Button>
                    <Typography variant="body2">
                      {selectedFile ? selectedFile.name : "No file chosen"}
                    </Typography>
                  </Box>
                  {!previewUrl ? (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Preview:
                      </Typography>
                      <Box
                        component="img"
                        src={`http://localhost:4000/uploads/${updata.home_Image}`}
                        alt="Preview"
                        sx={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Preview:
                      </Typography>
                      <Box
                        component="img"
                        src={previewUrl}
                        alt="Preview"
                        sx={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FiSave />}
                  size="large"
                  type="submit"
                >
                  Update Content
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Home_update;
