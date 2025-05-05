import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Card,
  CardMedia,
} from "@mui/material";
import { FiUpload, FiSave, FiX } from "react-icons/fi";
import axios from "axios";

const HomeAdd = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
    route:"",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const FormDatatoSent = new FormData();
      FormDatatoSent.append("description", formData.description);
      FormDatatoSent.append("image", formData.image);
      FormDatatoSent.append("route",formData.route)
      console.log(formData);
      const response = axios.post(
        "http://localhost:4000/admin_side/upload_home_cont",
        FormDatatoSent,
        {
          headers: {
            "Content-Type": " multypart/form-data",
          },
        }
      );
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(preview);

    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          Add Home Content
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleTextChange}
                multiline
                rows={4}
                variant="outlined"
                placeholder="Enter home page description"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="route/stack"
                name="route"
                value={formData.route}
                onChange={handleTextChange}
                multiline
                rows={4}
                variant="outlined"
                placeholder="Enter home page /route here"
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  p: 3,
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <input
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  id="image-upload"
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    startIcon={<FiUpload />}
                    variant="contained"
                    sx={{ mb: 2 }}
                  >
                    Upload Image
                  </Button>
                </label>
                <Typography variant="body2" color="textSecondary">
                  Supported formats: JPG, PNG, GIF
                </Typography>
              </Box>
            </Grid>

            {previewImage && (
              <Grid item xs={12}>
                <Box sx={{ position: "relative", mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Image Preview
                  </Typography>
                  <Card>
                    <CardMedia
                      component="img"
                      image={previewImage}
                      alt="Preview"
                      sx={{
                        height: 300,
                        objectFit: "contain",
                        bgcolor: "#f5f5f5",
                      }}
                    />
                  </Card>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<FiX />}
                    onClick={() => setPreviewImage(null)}
                    sx={{
                      position: "absolute",
                      top: 40,
                      right: 10,
                      borderRadius: "50%",
                      minWidth: "36px",
                      width: "36px",
                      height: "36px",
                      p: 0,
                    }}
                  >
                    <FiX />
                  </Button>
                </Box>
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                startIcon={<FiSave />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomeAdd;
