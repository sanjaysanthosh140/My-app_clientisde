import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ImageContainer = styled(Box)({
  overflow: 'hidden',
  borderRadius: '40%',
  position: 'relative',
  '& img:nth-of-type(1)': {
    animation: 'float 3s ease-in-out infinite'
  },
  '& img:nth-of-type(2)': {
    animation: 'float 4s ease-in-out infinite'
  },
  '& img:nth-of-type(3)': {
    animation: 'float 5s ease-in-out infinite'
  },
  '& img:nth-of-type(4)': {
    animation: 'float 6s ease-in-out infinite'
  },
  '& img:nth-of-type(5)': {
    animation: 'float 7s ease-in-out infinite'
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' }
  }
});



const ContentBox = styled(Box)({
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'repeat(5, 1fr)',
  gap: '4px',
  alignItems: 'center',
  marginTop: '40px',
  position: 'relative',
  zIndex: 1,
  '& h4': {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateX(10px)', // Added hover effect for text
      // Color change on hover
    }
  }
});

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box display="grid" gridTemplateRows="repeat(auto-fill, minmax(100px, 1fr))" gap={4}>
          <ImageContainer>
            <img src="https://cdn.pixabay.com/photo/2024/05/21/19/57/glasses-8779028_640.jpg" alt="Image 1" style={{ width: '100%', height: 'auto', marginTop: '40px'}} />
          </ImageContainer>
          <ImageContainer>
            <img src="https://cdn.pixabay.com/photo/2014/07/24/11/06/web-400893_640.jpg" alt="Image 2" style={{ width: '100%', height: 'auto'}} />
          </ImageContainer>
          <ImageContainer>
            <img src="https://cdn.pixabay.com/photo/2024/08/20/15/17/burger-8983662_640.jpg" alt="Image 3" style={{ width: '100%', height: 'auto'}} />
          </ImageContainer>
          <ImageContainer>
            <img src="https://cdn.pixabay.com/photo/2024/10/09/14/20/ai-generated-9108436_640.png" alt="Image 4" style={{ width: '100%', height: 'auto'}} />
          </ImageContainer>
          <ImageContainer>
            <img src="https://cdn.pixabay.com/photo/2017/08/19/12/00/design-2658294_640.jpg" alt="Image 5" style={{ width: '100%', height: 'auto'}} />
          </ImageContainer>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <ContentBox>
          <Typography variant="h4">
            First Content Section
          </Typography>
          <Typography variant="h4">
            Second Content Section
          </Typography>
          <Typography variant="h4">Third Content Section</Typography>
          <Typography variant="h4">Fourth Content Section</Typography>
          <Typography variant="h4">Fifth Content Section</Typography>
        </ContentBox>
      </Grid>
    </Grid>
  );
};

export default Home;
