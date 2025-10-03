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
  FaRocket,
  FaBrain,
  FaMagic,
  FaChartLine,
  FaClock,
  FaLightbulb,
  FaCogs,
  FaAws,
  FaDocker,
  FaGithub,
  FaPython
} from "react-icons/fa";
import { gql,useQuery} from '@apollo/client';
import { progress } from "framer-motion";
import keys from "../../keys";

// Enhanced styled components with vertical scrolling and hover effects
const TechStacksContainer = styled(Box)(({ theme }) => ({
  height: "85vh",
  overflowY: "auto",
  scrollBehavior: "smooth",
  padding: theme.spacing(1, 0.5),
  [theme.breakpoints.down('sm')]: {
    height: "auto",
    maxHeight: "70vh",
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: "75vh",
  },
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "10px",
    "&:hover": {
      background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
    }
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#667eea rgba(255,255,255,0.1)",
}));

const ImageCard = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "300px",
  borderRadius: "20px",
  overflow: "hidden",
  marginBottom: theme.spacing(3),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
  transform: "translateY(0)",
  cursor: "pointer",
  [theme.breakpoints.down('sm')]: {
    height: "250px",
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: "280px",
  },
  "&:hover": {
    transform: "translateY(-15px) scale(1.02)",
    boxShadow: "0 25px 50px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(25px)",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    "& .card-overlay": {
      opacity: 0.9,
    },
    "& .card-content": {
      transform: "translateY(0)",
      opacity: 1,
    },
    "& .card-icon": {
      transform: "translateY(0) scale(1.1) rotate(5deg)",
      opacity: 1,
    },
    "& img": {
      transform: "scale(1.15)",
      filter: "brightness(1.1)",
    },
  },
}));

const CardImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.7s ease",
});

const CardOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(102, 126, 234, 0.5))",
  backdropFilter: "blur(2px)",
  opacity: 0.7,
  transition: "all 0.5s ease",
  zIndex: 1,
}));

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
  padding: theme.spacing(4, 3),
  borderRadius: "24px",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.1))",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 15px 40px rgba(102, 126, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  marginBottom: theme.spacing(4),
  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
    borderRadius: "20px",
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.between('sm', 'md')]: {
    padding: theme.spacing(3.5, 2.5),
  },
  "&:hover": {
    transform: "translateY(-8px) scale(1.01)",
    boxShadow: "0 20px 50px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.15))",
    backdropFilter: "blur(25px)",
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 60%, #f093fb 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "800",
  marginBottom: theme.spacing(2),
  letterSpacing: "-0.5px",
  [theme.breakpoints.down('sm')]: {
    fontSize: "1.8rem",
    marginBottom: theme.spacing(1.5),
  },
}));



const Home = () => {
  const [stacks, setStacks] = useState(null);
  const [loadings, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Fetch data from server
  useEffect(() => {
   
    fetch(`${keys.SERVER_API_CALL}/admin_side/get_home_cont`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data", keys.SERVER_API_CALL);
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
    <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
      <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
        <Grid item xs={12} md={5}>
          <WelcomeSection>
            <GradientText variant={isMobile ? "h4" : "h3"}>
              AI-Powered Tech Stack Evolution
            </GradientText>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                color: "text.primary",
                lineHeight: 1.7,
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                fontWeight: "400",
              }}
            >
              Transform your development workflow with AI agents. Our SaaS platform integrates 
              cutting-edge artificial intelligence into your tech stack, enhancing code quality, 
              reducing development time, and delivering outstanding results through intelligent automation.
            </Typography>
            
            {/* Benefits Grid */}
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              mb: 3 
            }}>
              <Box sx={{ 
                p: 2, 
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(102, 126, 234, 0.15)",
                  transform: "translateY(-3px)",
                }
              }}>
                <FaChartLine size={28} color="#667eea" style={{ marginBottom: "8px" }} />
                <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                  Boost Quality
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  AI-enhanced code review and optimization
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 2, 
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(102, 126, 234, 0.15)",
                  transform: "translateY(-3px)",
                }
              }}>
                <FaClock size={28} color="#764ba2" style={{ marginBottom: "8px" }} />
                <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                  Save Time
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Automate repetitive tasks instantly
                </Typography>
              </Box>
            </Box>

            {/* AI Features Icons */}
            <Box sx={{ 
              display: "flex", 
              gap: { xs: 2, sm: 3 },
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
            }}>
              <Box sx={{ textAlign: "center" }}>
                <FaBrain size={isMobile ? 28 : 36} color="#667eea" />
                <Typography variant="caption" display="block" sx={{ mt: 0.5, fontWeight: "600" }}>
                  Smart AI
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FaRocket size={isMobile ? 28 : 36} color="#764ba2" />
                <Typography variant="caption" display="block" sx={{ mt: 0.5, fontWeight: "600" }}>
                  Fast Deploy
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FaMagic size={isMobile ? 28 : 36} color="#f093fb" />
                <Typography variant="caption" display="block" sx={{ mt: 0.5, fontWeight: "600" }}>
                  Auto Fix
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FaCogs size={isMobile ? 28 : 36} color="#667eea" />
                <Typography variant="caption" display="block" sx={{ mt: 0.5, fontWeight: "600" }}>
                  Optimize
                </Typography>
              </Box>
            </Box>
          </WelcomeSection>
          
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between", 
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 2, sm: 0 },
            mb: 3,
            p: { xs: 2, sm: 2.5 },
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.05))",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            <Box>
              <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="600" sx={{ mb: 0.5 }}>
                AI-Enhanced Stacks
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Powered by advanced intelligence
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: { xs: 2, sm: 1.5 }, alignItems: "center" }}>
              <FaLightbulb size={isMobile ? 20 : 24} color="#f093fb" />
              <FaGithub size={isMobile ? 20 : 24} />
              <FaDocker size={isMobile ? 20 : 24} />
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
                  <CardImage src={`${keys.SERVER_API_CALL}/uploads/${stack.home_Image}`} alt={stack.title} />
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
