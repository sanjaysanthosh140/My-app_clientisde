import { useQuery } from "@apollo/client";
import { GET_ALL_TOOLS, GET_ALL_App } from "../lib/Query";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Grid,
  Container,
  Skeleton,
  Alert,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FiExternalLink,
  FiTag,
  FiDollarSign,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { useEffect, useState } from "react";
// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.05
  )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: "20px",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  cursor: "pointer",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.error.main})`,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  },
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
    "&::before": {
      transform: "scaleX(1)",
    },
    "& .tool-icon": {
      transform: "rotate(360deg) scale(1.2)",
      color: theme.palette.primary.main,
    },
    "& .tool-name": {
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    "& .visit-btn": {
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      transform: "translateX(5px)",
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: "60px",
  height: "60px",
  borderRadius: "16px",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: "2px",
    borderRadius: "14px",
    background: alpha(theme.palette.background.paper, 0.8),
    zIndex: -1,
  },
}));

const PricingChip = styled(Chip)(({ theme, pricing }) => {
  const getColor = () => {
    if (pricing?.toLowerCase().includes("free"))
      return theme.palette.success.main;
    if (pricing?.toLowerCase().includes("premium"))
      return theme.palette.warning.main;
    return theme.palette.info.main;
  };

  return {
    background: `linear-gradient(45deg, ${alpha(getColor(), 0.1)}, ${alpha(
      getColor(),
      0.2
    )})`,
    color: getColor(),
    border: `1px solid ${alpha(getColor(), 0.3)}`,
    fontWeight: 600,
    "& .MuiChip-icon": {
      color: getColor(),
    },
  };
});

const CategoryChip = styled(Chip)(({ theme }) => ({
  background: alpha(theme.palette.text.primary, 0.05),
  color: theme.palette.text.secondary,
  border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  fontWeight: 500,
  fontSize: "0.75rem",
}));

const VisitButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: 600,
  padding: "10px 20px",
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

// Tool Card Component
const ToolCard = ({ tool, index }) => {
  const theme = useTheme();

  const getToolIcon = (category) => {
    const iconProps = { size: 28, className: "tool-icon" };
    switch (category?.toLowerCase()) {
      case "ai":
        return <HiSparkles {...iconProps} />;
      case "analytics":
        return <FiTrendingUp {...iconProps} />;
      case "productivity":
        return <FiZap {...iconProps} />;
      default:
        return <HiSparkles {...iconProps} />;
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard>
        <CardContent
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header with Icon */}
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
            <IconWrapper>{getToolIcon(tool.category)}</IconWrapper>
            <Box sx={{ ml: "auto" }}>
              <CategoryChip
                label={tool.category}
                size="small"
                icon={<FiTag size={14} />}
              />
            </Box>
          </Box>

          {/* Tool Name */}
          <Typography
            variant="h6"
            className="tool-name"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: "1.1rem",
              lineHeight: 1.3,
              transition: "all 0.3s ease",
            }}
          >
            {tool.name}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              flexGrow: 1,
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {tool.description}
          </Typography>

          {/* Footer */}
          <Box sx={{ mt: "auto" }}>
            {/* Pricing */}
            <Box sx={{ mb: 2 }}>
              <PricingChip
                label={tool.pricing}
                size="small"
                icon={<FiDollarSign size={14} />}
                pricing={tool.pricing}
              />
            </Box>

            {/* Visit Button */}
            <VisitButton
              fullWidth
              className="visit-btn"
              endIcon={<FiExternalLink size={16} />}
              onClick={() =>
                window.open(tool.officialurl, "_blank", "noopener,noreferrer")
              }
            >
              Explore Tool
            </VisitButton>
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

// Loading Skeleton
const ToolCardSkeleton = () => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card sx={{ height: "320px", borderRadius: "20px" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton variant="rounded" width={60} height={60} />
          <Skeleton
            variant="rounded"
            width={80}
            height={24}
            sx={{ ml: "auto" }}
          />
        </Box>
        <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} width="100%" />
        <Skeleton variant="text" height={20} width="90%" />
        <Skeleton variant="text" height={20} width="70%" sx={{ mb: 3 }} />
        <Skeleton variant="rounded" width={100} height={28} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width="100%" height={40} />
      </CardContent>
    </Card>
  </Grid>
);

// Main Component
function Tools_list(props) {
  let templist = [];
  let [itme, Setitems] = useState([]);
  const theme = useTheme();
  var loading;
  var error;
  var data;
  // if(props.props){
  //  var { loading, error, data } = useQuery(GET_ALL_TOOLS);
  // }

  switch (props.props) {
    case "web": {
      var { loading, error, data } = useQuery(GET_ALL_TOOLS);
      break;
    }
    case "app": {
      var { loading, error, data } = useQuery(GET_ALL_App);
      break;
    }
    default: {
      var { loading, error, data } = useQuery(GET_ALL_TOOLS);
      break;
    }
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: "12px",
            "& .MuiAlert-message": { fontSize: "1rem" },
          }}
        >
          Failed to load tools: {error.message};
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "24px",
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )}, ${alpha(theme.palette.secondary.main, 0.05)})`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AI Tools Collection
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: "600px", mx: "auto" }}
        >
          Discover powerful AI tools to boost your productivity and creativity
        </Typography>
      </Paper>

      {/* Tools Grid */}
      <Grid container spacing={3}>
        {
        loading
          ? // Loading Skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <ToolCardSkeleton key={index} />
            ))
          : // Tool Cards
          data.ai_web_tools
          ? data.ai_web_tools?.map((tool, index) => (
              <ToolCard key={tool.id || index} tool={tool} index={index} />
            ))
          : data.ai_app_tools
          ? data.ai_app_tools?.map((tool, index) => (
              <ToolCard key={tool.id || index} tool={tool} index={index} />
            ))
          : null
        }
      </Grid>

      {/* Empty State */}
      {!loading && (!data?.ai_web_tools || data.ai_web_tools.length === 0) && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No tools found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for new AI tools!
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Tools_list;
