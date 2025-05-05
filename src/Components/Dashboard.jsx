import { Box, Card, Grid, Typography } from '@mui/material';
import { BsBoxSeam, BsTrash, BsPencilSquare, BsGrid, BsPeople, BsPersonX, BsShieldLock } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';
import { useState, useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const floatingImages = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
  100% { transform: translateY(0px) rotate(360deg); opacity: 0.3; }
`;
const backgroundImages = [
    '🛒', '📦', '🔑', '👤', '📱', '💻', '🛍️'  // You can replace these with actual image URLs
  ];
  const adminOptions = [
    { title: 'Add Product', icon: <BsBoxSeam size={24} />, path: '/add-product' },
    { title: 'Delete Product', icon: <BsTrash size={24} />, path: '/delete-product' },
    { title: 'Update Product', icon: <BsPencilSquare size={24} />, path: '/update-product' },
    { title: 'View All Products', icon: <BsGrid size={24} />, path: '/all-products' },
    { title: 'View Users', icon: <BsPeople size={24} />, path: '/users' },
    { title: 'Add_Home_contend', icon: <BsPersonX size={24} />, path: '/Home_contend' },
    { title: 'update_Home', icon: <BsShieldLock size={24} />, path: '/sub_home_upload' },
    //{ title: 'update_Home', icon: <BsShieldLock size={24} />, path: '/update_home' },
    { title: 'delete_Home', icon: <BsShieldLock size={24} />, path: '/delete_Home' },
  ];

  return (
    <Box sx={{ 
        flexGrow: 1, 
    p: 3,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.9)',
      zIndex: 1
    },
    '& > *': {
      position: 'relative',
      zIndex: 2
    }
        
     }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>
      {backgroundImages.map((image, index) => (
    <Box
      key={index}
      sx={{
        position: 'absolute',
        fontSize: '2rem',
        animation: `${floatingImages} ${3 + index}s infinite`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: 0.8,
        zIndex: 0
      }}
    >
      {image}
    </Box>
  ))}
      <Grid container spacing={3}>
        {adminOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                  bgcolor: 'primary.light',
                  color: 'white'
                }
              }}
              onClick={() => navigate(option.path)}
            >
              {option.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {option.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
