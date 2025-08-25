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
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Container,
  Stack,
  Badge,
  LinearProgress,
} from "@mui/material";
import {
  FaImage,
  FaEdit,
  FaSave,
  FaChevronDown,
  FaPlus,
  FaTrash,
  FaEye,
  FaPalette,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHome,
  FaLayerGroup,
  FaMagic,
  FaRocket,
} from "react-icons/fa";
import { MdDashboard, MdPreview } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import axios from "axios";

const SubHomeContent = () => {
  const [homeContents, setHomeContents] = useState([]); // stored fetch data 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  useEffect(() => {
    const fetch_Home_data = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/admin_side/get_home&sub_home_cont",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
        console.log(response.data)
          setHomeContents(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch home data:", error);
        setError("Failed to load content data");
      } finally {
        setLoading(false);
      }
    };

    fetch_Home_data();
  }, []);

  // Handle main content changes
  const handleMainContentChange = (mainIndex, field, value) => {
    setHomeContents((prevContents) =>
      prevContents.map((content, index) =>
        index === mainIndex ? { ...content, [field]: value } : content
      )
    );
  };

  // Handle main image change
  const handleMainImageChange = (mainIndex, e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("selected",e.target.files[0])
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setHomeContents((prevContents) =>
        prevContents.map((content, index) =>
          index === mainIndex
            ? { ...content, image: file, imagePreview: imageUrl }
            : content
        )
      );
    }
  };
  // Handle sub content changes
  const handleSubContentChange = (mainIndex, subIndex, field, value) => {
    setHomeContents((prevContents) =>
      prevContents.map((content, index) =>
       
        index === mainIndex
          ? {
              ...content,
              sub_home_data: content.sub_home_data?.map((subContent, subIdx) =>
                subIdx === subIndex
                  ? { ...subContent, [field]: value }
                  : subContent
              ),
            }
          : content
      )
    );
    
  };


  // Handle sub content image change
  const handleSubImageChange = (mainIndex, subIndex, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setHomeContents((prevContents) =>
        prevContents.map((content, index) =>
          index === mainIndex
            ? {
                ...content,
                sub_home_data: content.sub_home_data?.map(
                  (subContent, subIdx) =>
                    subIdx === subIndex
                      ? { ...subContent, image: file, imagePreview: imageUrl }
                      : subContent
                ),
              }
            : content
        )
      );
    }
  };


  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      const formData = new FormData();

      formData.append("homeContents", JSON.stringify(homeContents));

      homeContents.forEach((content, mainIndex) => {
        if (content.image && typeof content.image === "object") {
          formData.append("main_img" ,content.image);
        }

        if (content.sub_home_data) {
          content.sub_home_data.forEach((subContent, subIndex) => {
            if (subContent.image && typeof subContent.image === "object") {
              formData.append(
                "sub_img",
                subContent.image
              );
            }
          });
        }
      });
      
      // formData.forEach((cont,i)=>{
        // console.log(cont)
      // })

      await axios.put(
        "http://localhost:4000/admin_side/all_home_content_update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
            //  
      alert("Content updated successfully!");
    } catch (error) {
      console.error("Failed to save changes:", error);
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 4,
          m: 2,
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "white",
            mb: 2,
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
        />
        <Typography variant="h6" sx={{ color: "white", fontWeight: 300 }}>
          Loading amazing content...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 56,
                    height: 56,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <FaRocket size={24} color="white" />
                </Avatar>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: { xs: "2rem", md: "3rem" },
                    }}
                  >
                    Content Studio
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 300,
                    }}
                  >
                    Craft beautiful home experiences
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  icon={<FaHome />}
                  label={`${homeContents.length} Main Sections`}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Chip
                  icon={<FaLayerGroup />}
                  label={`${homeContents.reduce(
                    (acc, content) =>
                      acc + (content.sub_home_data?.length || 0),
                    0
                  )} Sub Contents`}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                  }}
                />
              </Stack>
            </Box>

            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                zIndex: 1,
              }}
            />
          </Paper>
        </Fade>

        {error && (
          <Zoom in>
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 3,
                "& .MuiAlert-icon": {
                  fontSize: "1.5rem",
                },
              }}
              icon={<FaExclamationTriangle />}
            >
              {error}
            </Alert>
          </Zoom>
        )}

        {/* Content Cards */}
        <Grid container spacing={4}>
          {homeContents.map((homeContent, mainIndex) => (
            <Grid item xs={12} key={mainIndex}>
              <Fade in timeout={1000 + mainIndex * 200}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {/* Main Content Header */}
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${
                        mainIndex % 2 === 0
                          ? "#ff9a9e 0%, #fecfef 100%"
                          : "#a8edea 0%, #fed6e3 100%"
                      })`,
                      p: 3,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Badge
                        badgeContent={homeContent.sub_home_data?.length || 0}
                        color="secondary"
                        sx={{
                          "& .MuiBadge-badge": {
                            bgcolor: "white",
                            color: "primary.main",
                            fontWeight: "bold",
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "rgba(255,255,255,0.3)",
                            width: 48,
                            height: 48,
                          }}
                        >
                          <FaPalette size={20} />
                        </Avatar>
                      </Badge>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: "rgba(0,0,0,0.8)",
                            mb: 0.5,
                          }}
                        >
                          Main Section {mainIndex + 1}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(0,0,0,0.6)",
                            fontWeight: 500,
                          }}
                        >
                          Primary content area with sub-sections
                        </Typography>
                      </Box>
                      <Tooltip title="Preview Section">
                        <IconButton
                          sx={{
                            bgcolor: "rgba(255,255,255,0.3)",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.5)" },
                          }}
                        >
                          <FaEye />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    {/* Main Content Section */}
                    <Grid container spacing={4} sx={{ mb: 4 }}>
                      <Grid item xs={12} lg={5}>
                        <Box
                          sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                          }}
                        >
                          <img
                            src={
                              homeContent.imagePreview ||
                              `http://localhost:4000/uploads/${homeContent.home_img}`
                            }
                            alt={`Main content ${mainIndex + 1} preview`}
                            style={{
                              width: "100%",
                              height: "280px",
                              objectFit: "cover",
                            }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background:
                                "linear-gradient(45deg, rgba(0,0,0,0.1), transparent)",
                            }}
                          />
                          <Button
                            variant="contained"
                            component="label"
                            startIcon={<BiImageAdd />}
                            sx={{
                              position: "absolute",
                              bottom: 16,
                              right: 16,
                              borderRadius: 3,
                              bgcolor: "rgba(255,255,255,0.9)",
                              color: "primary.main",
                              backdropFilter: "blur(10px)",
                              "&:hover": {
                                bgcolor: "white",
                                transform: "scale(1.05)",
                              },
                            }}
                          >
                            Change Image
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) =>
                                handleMainImageChange(mainIndex, e)
                              }
                            />
                          </Button>
                        </Box>
                      </Grid>

                      <Grid item xs={12} lg={7}>
                        <Box
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color: "primary.main",
                              fontWeight: 600,
                            }}
                          >
                            <FaEdit /> Main Content Details
                          </Typography>
                          <TextField
                            fullWidth
                            label="Main Title"
                            value={
                              homeContent.home_name || homeContent.title || ""
                            }
                            onChange={(e) =>
                              handleMainContentChange(
                                mainIndex,
                                "home_name",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            sx={{
                              mb: 2,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "&:hover fieldset": {
                                  borderColor: "primary.main",
                                },
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4, borderStyle: "dashed" }} />

                    {/* Sub Home Contents Section */}
                    <Box sx={{ mb: 3 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 3 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "secondary.main",
                            fontWeight: 600,
                          }}
                        >
                          <HiSparkles /> Sub Content Sections
                        </Typography>
                        <Chip
                          icon={<FaLayerGroup />}
                          label={`${
                            homeContent.sub_home_data?.length || 0
                          } Items`}
                          color="secondary"
                          variant="outlined"
                          sx={{ borderRadius: 3 }}
                        />
                      </Stack>

                      {homeContent.sub_home_data &&
                      homeContent.sub_home_data.length > 0 ? (
                        <Grid container spacing={3}>
                          {homeContent.sub_home_data.map(
                            (subContent, subIndex) => (
                              <Grid item xs={12} md={6} lg={4} key={subIndex}>
                                <Card
                                  elevation={0}
                                  sx={{
                                    borderRadius: 3,
                                    border: "2px solid",
                                    borderColor: "grey.200",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                      borderColor: "primary.main",
                                      transform: "translateY(-2px)",
                                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                                    },
                                  }}
                                >
                                  <Box sx={{ position: "relative" }}>
                                    <img
                                      src={
                                        subContent.imagePreview ||
                                        `http://localhost:4000/uploads/${subContent.image}`
                                      }
                                      alt={`Sub content ${
                                        subIndex + 1
                                      } preview`}
                                      style={{
                                        width: "100%",
                                        height: "180px",
                                        objectFit: "cover",
                                        borderRadius: "12px 12px 0 0",
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: 12,
                                        right: 12,
                                      }}
                                    >
                                      <IconButton
                                        component="label"
                                        sx={{
                                          bgcolor: "rgba(255,255,255,0.9)",
                                          backdropFilter: "blur(10px)",
                                          "&:hover": {
                                            bgcolor: "white",
                                            transform: "scale(1.1)",
                                          },
                                        }}
                                      >
                                        <BiImageAdd color="primary" />
                                        <input
                                          type="file"
                                          hidden
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleSubImageChange(
                                              mainIndex,
                                              subIndex,
                                              e
                                            )
                                          }
                                        />
                                      </IconButton>
                                    </Box>
                                    <Chip
                                      label={`Sub ${subIndex + 1}`}
                                      size="small"
                                      sx={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        bgcolor: "rgba(255,255,255,0.9)",
                                        backdropFilter: "blur(10px)",
                                        fontWeight: 600,
                                      }}
                                    />
                                  </Box>

                                  <CardContent sx={{ p: 3 }}>
                                    <TextField
                                      fullWidth
                                      label="Sub Title"
                                      value={
                                        subContent.name ||
                                        subContent.title ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleSubContentChange(
                                          mainIndex,
                                          subIndex,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      variant="outlined"
                                      size="small"
                                      sx={{
                                        mb: 2,
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: 2,
                                        },
                                      }}
                                    />
                                    <TextField
                                      fullWidth
                                      label="Description"
                                      value={subContent.description || ""}
                                      onChange={(e) =>
                                        handleSubContentChange(
                                          mainIndex,
                                          subIndex,
                                          "description",
                                          e.target.value
                                        )
                                      }
                                      variant="outlined"
                                      size="small"
                                      multiline
                                      rows={3}
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: 2,
                                        },
                                      }}
                                    />
                                  </CardContent>
                                </Card>
                              </Grid>
                            )
                          )}
                        </Grid>
                      ) : (
                        <Paper
                          sx={{
                            p: 4,
                            textAlign: "center",
                            borderRadius: 3,
                            border: "2px dashed",
                            borderColor: "grey.300",
                            bgcolor: "grey.50",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              bgcolor: "grey.200",
                              mx: "auto",
                              mb: 2,
                            }}
                          >
                            <FaLayerGroup size={24} color="grey" />
                          </Avatar>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ mb: 1, fontWeight: 500 }}
                          >
                            No Sub Contents Available
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic" }}
                          >
                            This main content section doesn't have any
                            sub-sections yet.
                          </Typography>
                        </Paper>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Floating Action Button */}
        <Box
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1000,
          }}
        >
          <Tooltip title="Save All Changes" placement="left">
            <Button
              variant="contained"
              size="large"
              onClick={handleSaveChanges}
              disabled={saving}
              sx={{
                borderRadius: 4,
                px: 4,
                py: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(102, 126, 234, 0.5)",
                },
                "&:disabled": {
                  background: "grey.400",
                },
              }}
              startIcon={
                saving ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <FaSave />
                )
              }
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Tooltip>
        </Box>

        {/* Progress Bar for Saving */}
        {saving && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1100,
            }}
          >
            <LinearProgress
              sx={{
                height: 4,
                "& .MuiLinearProgress-bar": {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                },
              }}
            />
          </Box>
        )}

        {/* Success/Error Snackbar Alternative */}
        {error && (
          <Box
            sx={{
              position: "fixed",
              bottom: 100,
              right: 32,
              zIndex: 1000,
            }}
          >
            <Alert
              severity="error"
              sx={{
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SubHomeContent;
