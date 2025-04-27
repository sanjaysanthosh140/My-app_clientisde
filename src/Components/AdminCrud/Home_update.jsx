import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Grid,
  Container,
  Card,
  CardMedia
} from '@mui/material';
import { FiUpload, FiSave, FiX } from 'react-icons/fi';

function Home_update() {
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearImage = () => {
    setPreviewImage(null);
    setFormData({
      ...formData,
      image: null
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission
    // For example, sending the data to an API
    console.log('Form submitted:', formData);
    
    // You would typically use FormData for file uploads
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    if (formData.image) {
      submitData.append('image', formData.image);
    }
    
    // API call would go here
    // Example: axios.post('/api/update-home', submitData)
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Home Content
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Text inputs */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleTextChange}
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleTextChange}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            
            {/* Image upload */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Upload Banner Image
                </Typography>
                
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<FiUpload />}
                  sx={{ mr: 2 }}
                >
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                
                {formData.image && (
                  <Typography variant="body2" component="span">
                    {formData.image.name}
                  </Typography>
                )}
              </Box>
            </Grid>
            
            {/* Image preview */}
            {previewImage && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Image Preview
                </Typography>
                <Box sx={{ position: 'relative', width: 'fit-content' }}>
                  <Card sx={{ maxWidth: 345, mb: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={previewImage}
                      alt="Preview"
                      sx={{ objectFit: 'contain' }}
                    />
                  </Card>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small"
                    onClick={clearImage}
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8,
                      minWidth: '36px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%'
                    }}
                  >
                    <FiX />
                  </Button>
                </Box>
              </Grid>
            )}
            
            {/* Submit button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<FiSave />}
                size="large"
              >
                Update Content
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home_update;
