import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaPython,
  FaJs,
  FaDatabase,
  FaShieldAlt,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGithub
} from "react-icons/fa";
import { gql,useQuery} from '@apollo/client';

// Enhanced styled components with vertical scrolling and hover effects
const TechStacksContainer = styled(Box)(({ theme }) => ({
  height: "85vh",
  overflowY: "auto",
  scrollBehavior: "smooth",
  padding: "10px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(0,0,0,0.05)",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(45deg, #2196F3, #21CBF3)",
    borderRadius: "10px",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#2196F3 rgba(0,0,0,0.05)",
}));

const ImageCard = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "300px",
  borderRadius: "20px",
  overflow: "hidden",
  marginBottom: "30px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
  transform: "translateY(0)",
  "&:hover": {
    transform: "translateY(-15px)",
    boxShadow: "0 20px 40px rgba(33, 150, 243, 0.3)",
    "& .card-overlay": {
      opacity: 0.85,
    },
    "& .card-content": {
      transform: "translateY(0)",
      opacity: 1,
    },
    "& .card-icon": {
      transform: "translateY(0) scale(1.1)",
      opacity: 1,
    },
    "& img": {
      transform: "scale(1.1)",
    },
  },
}));

const CardImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.7s ease",
});

const CardOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(33, 150, 243, 0.4))",
  opacity: 0.6,
  transition: "opacity 0.5s ease",
  zIndex: 1,
});

const CardContent = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "25px",
  zIndex: 2,
  transform: "translateY(20px)",
  opacity: 0.9,
  transition: "all 0.5s ease",
});

const CardTitle = styled(Typography)({
  color: "white",
  fontWeight: 700,
  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
  marginBottom: "8px",
});

const CardDescription = styled(Typography)({
  color: "rgba(255,255,255,0.9)",
  fontWeight: 400,
});

const IconContainer = styled(Box)({
  position: "absolute",
  top: "20px",
  right: "20px",
  zIndex: 2,
  color: "white",
  fontSize: "2.5rem",
  transform: "translateY(-10px)",
  opacity: 0,
  transition: "all 0.5s ease",
  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.5))",
});

const WelcomeSection = styled(Box)(({ theme }) => ({
  padding: "40px 20px",
  borderRadius: "20px",
  background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  marginBottom: "30px",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 35px rgba(33, 150, 243, 0.2)",
  },
}));

const GradientText = styled(Typography)({
  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  marginBottom: "15px",
});



const Home = () => {
  const [stacks, setStacks] = useState(null);
  const [loadings, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Fetch data from server
  useEffect(() => {
   
    fetch("http://localhost:4000/admin_side/get_home_cont", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data", data);
        setStacks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 900;

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <WelcomeSection>
            <GradientText variant={isMobile ? "h4" : "h3"}>
              Explore Technology Stacks
            </GradientText>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              Discover and master the most in-demand technology stacks in the industry.
              Our comprehensive learning paths will guide you through everything you need to know.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {!isMobile && (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <FaPython size={30} color="#3776AB" />
                  <FaJs size={30} color="#F7DF1E" />
                  <FaReact size={30} color="#61DAFB" />
                  <FaNodeJs size={30} color="#339933" />
                  <FaAws size={30} color="#FF9900" />
                </Box>
              )}
            </Box>
          </WelcomeSection>
          
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            mb: 3,
            p: 2,
            borderRadius: "10px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
          }}>
            <Typography variant="h6" fontWeight="500">
              Popular Technologies
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <FaGithub size={24} />
              <FaDocker size={24} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          {loadings ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="70vh"
            >
              <CircularProgress size={60} sx={{ color: "#2196F3" }} />
            </Box>
          ) : (
            <TechStacksContainer>
              {stacks && stacks.map((stack,index) => (
                <ImageCard key={index} onClick={() => navigate(stack.route)}>
                  <CardImage src={`http://localhost:4000/uploads/${stack.home_Image}`} alt={stack.title} />
                  <CardOverlay className="card-overlay" />
                  <IconContainer className="card-icon">

                  </IconContainer>
                  <CardContent className="card-content">
                    <CardTitle variant={isMobile ? "h5" : "h4"}>
                      {stack.title}
                    </CardTitle>
                    <CardDescription variant="body1">
                      {stack.description}
                    </CardDescription>
                  </CardContent>
                </ImageCard>
              ))}
            </TechStacksContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
