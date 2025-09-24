import { useQuery } from "@apollo/client";
import {
  GET_ALL_TOOLS,
  GET_ALL_App,
  GET_ALL_API,
  GET_ALL_db,
  GET_MARKETING_AI_TOOL,
  ALL_SEO_TOOLS,
  GET_ALL_WEB_DESIGN,
  ALL_GOOGLE_ADD,
  ALL_FREE_DETECTOR,
  ALL_BYPASSERS,
  ALL_CONTENT_DETECTOR,
  ALL_HUMANIZOR,
  ALL_EDU_KNOW_MANAGE,
  ALL_EDU_IMG_TOOLS,
  ALL_EDU_MIND_MANAGE_TOOLS,
  ALL_EDU_VIDEO_ROOLS,
  All_ai_video_generator,
  All_ai_video_summarizor,
  All_ai_convert_to_short,
  All_ai_ugc_video,
} from "../lib/Query";
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
  FiBookmark,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import keys from "../../keys";
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

const PinIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "12px",
  right: "12px",
  width: "28px",
  height: "28px",
  borderRadius: "6px",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  zIndex: 2,
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.common.white,
    transform: "scale(1.1) rotate(12deg)",
    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));
const token = localStorage.getItem("token");
let alertFun = async (tool, id, category) => {
  try {
    let tooldetal = {
      toolCategory: category,
      toolName: tool,
      toolId: id,
    };
    await axios.post(`${keys.SERVER_API_CALL}/user_side/newCart/`, tooldetal, {
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
    Authorization: token,
    },
    });
    console.log("toolData",tooldetal);
  } catch (error) {
    console.log(error);
  }
};
// Tool Card Componentj
const ToolCard = ({ tool, index, category }) => {
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
        {/* Pin Icon */}
        <PinIcon>
          <FiBookmark
            size={25}
            onClick={() => alertFun(tool.name, index, category)}
          />
        </PinIcon>

        <CardContent
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header with Icon */}
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2, pr: 5 }}>
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
  let navigator = useNavigate();
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
      console.log(error);
      break;
    }
    case "api": {
      var { loading, error, data } = useQuery(GET_ALL_API);
      console.log(props.props);
      break;
    }
    case "app": {
      var { loading, error, data } = useQuery(GET_ALL_App);
      break;
    }
    case "db": {
      var { loading, error, data } = useQuery(GET_ALL_db);
      break;
    }
    // Dropshiping_tools
    case "web_design_tools": {
      var { loading, error, data } = useQuery(GET_ALL_WEB_DESIGN);
      console.log(data);
      break;
    }
    case "shopify_store": {
      var { loading, error, data } = useQuery(GET_MARKETING_AI_TOOL);
      break;
    }
    case "seo_tool": {
      var { loading, error, data } = useQuery(ALL_SEO_TOOLS);
      console.log(data);
      break;
    }
    case "google_add": {
      var { loading, error, data } = useQuery(ALL_GOOGLE_ADD);
      break;
    }

    // ai_detection
    case "free_tools": {
      var { loading, error, data } = useQuery(ALL_FREE_DETECTOR);
      console.log(data);
      break;
    }
    case "bypasser": {
      var { loading, error, data } = useQuery(ALL_BYPASSERS);
      console.log(data);
      break;
    }
    case "content_detect": {
      var { loading, error, data } = useQuery(ALL_CONTENT_DETECTOR);
      console.log(data);
      break;
    }
    case "humanizor": {
      var { loading, error, data } = useQuery(ALL_HUMANIZOR);
      //console.log(data);
      break;
    }

    //education_tools_ai
    case "edu_tools": {
      var { loading, error, data } = useQuery(ALL_EDU_KNOW_MANAGE);
      console.log(data);
      break;
    }
    case "edu_img": {
      var { loading, error, data } = useQuery(ALL_EDU_IMG_TOOLS);
      console.log(data);
      break;
    }
    case "edu_mind_map": {
      var { loading, error, data } = useQuery(ALL_EDU_MIND_MANAGE_TOOLS);
      console.log(data);
      break;
    }
    case "edu_video": {
      var { loading, error, data } = useQuery(ALL_EDU_VIDEO_ROOLS);
      console.log(data);
      break;
    }
    //  vidoe_tools
    case "AI_Video_Generator": {
      var { loading, error, data } = useQuery(All_ai_video_generator);
      console.log(data);
      break;
    }
    case "Ai_video_summarizor": {
      var { loading, error, data } = useQuery(All_ai_video_summarizor);
      console.log(data);
      break;
    }
    case "convert_to_short": {
      var { loading, error, data } = useQuery(All_ai_convert_to_short);
      console.log(data);
      break;
    }
    case "UGC_video": {
      var { loading, error, data } = useQuery(All_ai_ugc_video);
      console.log(data);
      break;
    }
    default: {
      // var { loading, error, data } = useQuery(GET_ALL_TOOLS);
      // break;
    }
  }

  if (error) {
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

        {/* Enhanced Error Alert */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: "24px",
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.error.main,
              0.08
            )}, ${alpha(theme.palette.error.light, 0.05)})`,
            border: `2px solid ${alpha(theme.palette.error.main, 0.2)}`,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.error.light})`,
            },
          }}
        >
          <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.error.main,
                0.15
              )}, ${alpha(theme.palette.error.light, 0.1)})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              border: `3px solid ${alpha(theme.palette.error.main, 0.3)}`,
            }}
          >
            <Typography
              sx={{
                fontSize: "2.5rem",
                color: theme.palette.error.main,
              }}
            >
              ⚠️
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.error.main,
            }}
          >
            Oops! Something went wrong
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: "500px", mx: "auto" }}
          >
            {error.message === "login first"
              ? "Please log in to access these tools"
              : `Failed to load tools: ${error.message}`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {error.message === "login first" ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigator("/login")}
                sx={{
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  "&:hover": {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Go to Login
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="large"
                onClick={() => window.location.reload()}
                sx={{
                  borderRadius: "16px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderColor: theme.palette.error.main,
                  color: theme.palette.error.main,
                  "&:hover": {
                    borderColor: theme.palette.error.dark,
                    backgroundColor: alpha(theme.palette.error.main, 0.05),
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Try Again
              </Button>
            )}

            <Button
              variant="text"
              size="large"
              onClick={() => navigator("/")}
              sx={{
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                color: theme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.text.primary, 0.05),
                  transform: "translateY(-2px)",
                },
              }}
            >
              Go Home
            </Button>
          </Box>
        </Paper>
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
        {loading
          ? // Loading Skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <ToolCardSkeleton key={index} />
            ))
          : // Tool Cards
          data.ai_web_tools
          ? data.ai_web_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_web_tools"}
              />
            ))
          : data.ai_app_tools
          ? data.ai_app_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_app_tools"}
              />
            ))
          : data.ai_api_tools
          ? data.ai_api_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_api_tools"}
              />
            ))
          : data.ai_sql_tools
          ? data.ai_sql_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_sql_tools"}
              />
            ))
          : // Drop_shiping
          data.ai_shopify_tools
          ? data.ai_shopify_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_shopify_tools"}
              />
            ))
          : data.ai_web_design_tools
          ? data.ai_web_design_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_web_design_tools"}
              />
            ))
          : data.ai_seo_tools
          ? data.ai_seo_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_seo_tools"}
              />
            ))
          : data.ai_google_add_tools
          ? data.ai_google_add_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_google_add_tools"}
              />
            ))
          : data.ai_free_detector_tools
          ? data.ai_free_detector_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_free_detector_tools"}
              />
            ))
          : data.ai_bypasser_tools
          ? data.ai_bypasser_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_bypasser_tools"}
              />
            ))
          : data.ai_content_detector_tools
          ? data.ai_content_detector_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_content_detector_tools"}
              />
            ))
          : data.ai_humanizor_tools
          ? data.ai_humanizor_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_humanizor_tools"}
              />
            ))
          : data.ai_know_manage_tools
          ? data.ai_know_manage_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_know_manage_tools"}
              />
            ))
          : data.ai_image_analist_tools
          ? data.ai_image_analist_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_image_analist_tools"}
              />
            ))
          : data.ai_mind_map_tools
          ? data.ai_mind_map_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_mind_map_tools"}
              />
            ))
          : data.ai_video_summerizer_tools
          ? data.ai_video_summerizer_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_video_summerizer_tools"}
              />
            ))
          : data.ai_video_creator_tools
          ? data.ai_video_creator_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_video_creator_tools"}
              />
            ))
          : data.ai_video_summerizor_tools
          ? data.ai_video_summerizor_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_video_summerizor_tools"}
              />
            ))
          : data.ai_long_video_short_tools
          ? data.ai_long_video_short_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_long_video_short_tools"}
              />
            ))
          : data.ai_ugc_tools
          ? data.ai_ugc_tools?.map((tool, index) => (
              <ToolCard
                key={tool.id || index}
                tool={tool}
                index={index}
                category={"ai_ugc_tools"}
              />
            ))
          : null}
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
