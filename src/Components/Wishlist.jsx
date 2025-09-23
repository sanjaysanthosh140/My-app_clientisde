import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { USER_PINNED } from "../lib/Pin_Query";

function Wishlist() {
  let [message, setmessage] = useState(false);
  let [wishItem, setwishItem] = useState([]);

  const { loading, error, data } = useQuery(USER_PINNED);

  useEffect(() => {
    if (loading) {
      console.log("loading...");
    } else if (data) {
      //console.log("data", data);
      //console.log(data.frv_toolslist);
      setwishItem(data.frv_toolslist);
    } else if (error) {
      console.log("error", error);
    }
  }, [loading, data, error]);
  if (wishItem) {
    console.log("working")
    console.log(wishItem);
  }
  const handleDelete = async (id) => {
    // setwishItem(wishItem.filter((item) => item._id !== id));
    // const token = localStorage.getItem("token");
    // axios
    //   .delete(`http://localhost:4000/user_side/delete_wish/${id}`, {
    //     withCredentials: true,
    //     headers: {
    //       Authorization: `${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     //console.log("res", res);
    //     setmessage({
    //       message: "Item Deleted Successfully",
    //       severity: "success",
    //       open: true,
    //     });
    //   });
    // //console.log("id", id);
  };

  const handleColose = () => {
    setmessage({
      ...message,
      open: false,
    });
  };

  const backgroundIcons = [
    {
      id: 1,
      top: "10%",
      left: "5%",
      rotation: 15,
      url: "https://cdn-icons-png.flaticon.com/256/2331/2331970.png",
    },
    {
      id: 2,
      top: "25%",
      right: "8%",
      rotation: -20,
      url: "https://cdn-icons-png.flaticon.com/256/1785/1785210.png",
    },
    {
      id: 3,
      bottom: "15%",
      left: "12%",
      rotation: 25,
      url: "https://cdn-icons-png.flaticon.com/256/3081/3081559.png",
    },
    {
      id: 4,
      bottom: "30%",
      right: "15%",
      rotation: -15,
      url: "https://cdn-icons-png.flaticon.com/256/3176/3176363.png",
    },
    {
      id: 5,
      top: "50%",
      left: "20%",
      rotation: 10,
      url: "https://cdn-icons-png.flaticon.com/256/4213/4213763.png",
    },
    {
      id: 6,
      top: "40%",
      right: "25%",
      rotation: -25,
      url: "https://cdn-icons-png.flaticon.com/256/3050/3050103.png",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(145deg, #f6f8fb 0%, #f0f2f5 100%)",
        overflow: "hidden",
      }}
    >
      {backgroundIcons.map((icon) => (
        <motion.div
          key={icon.id}
          style={{
            position: "absolute",
            ...icon,
            width: "80px",
            height: "80px",
            zIndex: 0,
          }}
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{
            y: [0, 20, 0],
            rotate: [icon.rotation, icon.rotation + 10, icon.rotation],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + icon.id,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.3,
            opacity: 0.9,
            rotate: icon.rotation + 15,
            transition: {
              duration: 0.3,
              type: "spring",
              stiffness: 300,
            },
          }}
        >
          <img
            src={icon.url}
            alt="background-icon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "grayscale(20%) opacity(0.7)",
              transition: "filter 0.3s ease",
              ":hover": {
                filter: "grayscale(0%) opacity(1)",
              },
            }}
          />
        </motion.div>
      ))}

      {/* Pinned Tools Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: { xs: 1, sm: 2, md: 3, lg: 4 },
          backdropFilter: "blur(5px)",
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 3, sm: 4, md: 5 },
            px: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: { xs: 1, sm: 2 },
              mb: 1,
            }}
          >
            My Favorite Tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Discover and manage your pinned development tools
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            justifyContent: "center",
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          {wishItem.map((tool, index) => {
            const toolName = tool.name || tool.title || tool.toolName || 'Development Tool';
            const toolPrice = tool.pricing || tool.cost || tool.amount || 'Free';
            const toolDescription = tool.description || tool.desc || tool.details || 'No description available';
            const toolCategory = tool.category || tool.type || tool.tags || 'General';
            const toolUrl = tool.officialurl || tool.link || tool.website || tool.href || '#';
            
            return (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3}
                key={tool._id || index}
              >
                <motion.div
                  whileHover={{ 
                    y: -12,
                    scale: 1.03,
                    transition: { duration: 0.4, type: "spring", stiffness: 300 }
                  }}
                  animate={{ 
                    y: [0, -2, 0],
                    transition: {
                      duration: 2 + index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Card
                    sx={{
                      height: { xs: "400px", sm: "420px", md: "450px" },
                      borderRadius: "20px",
                      background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        boxShadow: "0 25px 80px rgba(0, 0, 0, 0.15)",
                        "& .tool-header": {
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        },
                        "& .tool-icon": {
                          transform: "scale(1.1) rotate(5deg)",
                        },
                        "& .delete-btn": {
                          opacity: 1,
                          transform: "scale(1)",
                        },
                        "& .view-btn": {
                          background: "linear-gradient(45deg, #ff6b6b 0%, #feca57 100%)",
                          transform: "translateY(-2px)",
                        }
                      },
                    }}
                  >
                    {/* Delete Button */}
                    <IconButton
                      className="delete-btn"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 3,
                        opacity: 0,
                        transform: "scale(0.8)",
                        bgcolor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        color: "#ff6b6b",
                        width: 40,
                        height: 40,
                        transition: "all 0.3s ease",
                        "&:hover": { 
                          bgcolor: "#ff6b6b", 
                          color: "white",
                          transform: "scale(1.1)",
                          boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(tool._id);
                      }}
                    >
                      <MdDeleteOutline />
                    </IconButton>

                    {/* Tool Header */}
                    <Box
                      className="tool-header"
                      sx={{
                        height: "120px",
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        transition: "all 0.4s ease",
                      }}
                    >
                      <Box
                        className="tool-icon"
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.2)",
                          backdropFilter: "blur(10px)",
                          border: "3px solid rgba(255, 255, 255, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Typography
                          sx={{ 
                            fontSize: "2rem",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                          }}
                        >
                          🚀
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3, height: "calc(100% - 120px)", display: "flex", flexDirection: "column" }}>
                      {/* Tool Name */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "700",
                          color: "text.primary",
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          lineHeight: 1.3,
                          mb: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {String(toolName)}
                      </Typography>

                      {/* Category Chip */}
                      <Chip
                        label={String(toolCategory)}
                        size="small"
                        sx={{
                          mb: 2,
                          width: "fit-content",
                          bgcolor: "rgba(79, 172, 254, 0.1)",
                          color: "primary.main",
                          fontWeight: "600",
                          fontSize: "0.7rem",
                        }}
                      />

                      {/* Price */}
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "700",
                            color: "#2e7d32",
                            fontSize: { xs: "1.3rem", sm: "1.5rem" },
                          }}
                        >
                          {typeof toolPrice === 'number' ? `$${toolPrice}` : String(toolPrice)}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.9rem",
                          lineHeight: 1.5,
                          flexGrow: 1,
                          mb: 3,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {String(toolDescription)}
                      </Typography>

                      {/* View Button */}
                      <Button
                        className="view-btn"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          if (toolUrl && toolUrl !== '#') {
                            window.open(toolUrl, '_blank');
                          }
                        }}
                        sx={{
                          borderRadius: "15px",
                          background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          fontWeight: "700",
                          textTransform: "none",
                          fontSize: "1rem",
                          py: 1.5,
                          boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
                          },
                        }}
                      >
                        {toolUrl && toolUrl !== '#' ? 'Visit Tool 🌐' : 'View Details 👀'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {/* Empty State */}
        {wishItem.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 4, sm: 6, md: 8 },
              px: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
                mb: 2,
              }}
            >
              🔍
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                mb: 1,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              No Tools Found
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "400px",
                mx: "auto",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Start adding your favorite development tools to see them here
            </Typography>
          </Box>
        )}

        <Snackbar
          open={message.open}
          autoHideDuration={6000}
          onClose={handleColose}
        >
          <Alert
            severity={message.severity}
            open={message.open}
            onClose={handleColose}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default Wishlist;
