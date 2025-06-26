import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  FaImage,
  FaEdit,
  FaSave,
  FaChevronDown,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

const SubHomeContent = () => {
  useEffect(() => {
    const fetch_Home_data = async () => {
      try {
        const web_home_contents = await axios.get("http://localhost:4000/admin_side/get_home&sub_home_cont",{
          headers:{
            "Content-Type":"application/json"
          }
        });
      } catch (error) {
        console.log(error);
      }
      console.log(web_home_contents);
    };

    fetch_Home_data();
  }, []);
  // Sample initial state for demonstration
  const [mainContent, setMainContent] = useState({
    title: "Main Content Title",
    image: null,
    imagePreview: "https://via.placeholder.com/300x200?text=Main+Image",
  });

  const [subContents, setSubContents] = useState([
    {
      id: 1,
      title: "Sub Content 1",
      description: "Description for sub content 1",
      image: null,
      imagePreview: "https://via.placeholder.com/150x100?text=Sub+Image+1",
    },
    {
      id: 2,
      title: "Sub Content 2",
      description: "Description for sub content 2",
      image: null,
      imagePreview: "https://via.placeholder.com/150x100?text=Sub+Image+2",
    },
    {
      id: 3,
      title: "Sub Content 3",
      description: "Description for sub content 3",
      image: null,
      imagePreview: "https://via.placeholder.com/150x100?text=Sub+Image+3",
    },
    {
      id: 4,
      title: "Sub Content 4",
      description: "Description for sub content 4",
      image: null,
      imagePreview: "https://via.placeholder.com/150x100?text=Sub+Image+4",
    },
  ]);

  // Handle main content changes
  const handleMainContentChange = (e) => {
    const { name, value } = e.target;
    setMainContent({
      ...mainContent,
      [name]: value,
    });
  };

  // Handle main image change
  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setMainContent({
        ...mainContent,
        image: file,
        imagePreview: imageUrl,
      });
    }
  };

  // Handle sub content changes
  const handleSubContentChange = (id, field, value) => {
    setSubContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id ? { ...content, [field]: value } : content
      )
    );
  };

  // Handle sub content image change
  const handleSubImageChange = (id, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setSubContents((prevContents) =>
        prevContents.map((content) =>
          content.id === id
            ? { ...content, image: file, imagePreview: imageUrl }
            : content
        )
      );
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Update Content
      </Typography>

      {/* Main Content Update Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <FaEdit /> Main Content
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "relative" }}>
              <img
                src={mainContent.imagePreview}
                alt="Main content preview"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
              <Button
                variant="contained"
                component="label"
                startIcon={<FaImage />}
                sx={{ position: "absolute", bottom: 10, right: 10 }}
              >
                Change Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleMainImageChange}
                />
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Main Title"
              name="title"
              value={mainContent.title}
              onChange={handleMainContentChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Sub Contents Update Section */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
        >
          <FaEdit /> Sub Contents
        </Typography>

        {subContents.map((content, index) => (
          <Accordion key={content.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<FaChevronDown />}>
              <Typography variant="h6">
                {content.title || `Sub Content ${index + 1}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={content.imagePreview}
                      alt={`Sub content ${index + 1} preview`}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<FaImage />}
                      sx={{ position: "absolute", bottom: 10, right: 10 }}
                    >
                      Change Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleSubImageChange(content.id, e)}
                      />
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={content.title}
                    onChange={(e) =>
                      handleSubContentChange(
                        content.id,
                        "title",
                        e.target.value
                      )
                    }
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    value={content.description}
                    onChange={(e) =>
                      handleSubContentChange(
                        content.id,
                        "description",
                        e.target.value
                      )
                    }
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaSave />}
          sx={{ px: 4 }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default SubHomeContent;
