import { useEffect, useState } from "react";
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
 Alert
} from "@mui/material";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";

function Wishlist() {
  let [message,setmessage] = useState({
    message:"",
    severity:"",
    open:false
  })
let [ wishItem,setwishItem] = useState([])
const handleDelete = async(id) =>{
  setwishItem(wishItem.filter((item)=>item._id !== id))
  const token = localStorage.getItem("token")
   axios.delete(
    //`https://myapp-server-side-pqkd.onrender.com/user_side/delete_wish/${id}`,
    {
    withCredentials:true,
    headers:{
      Authorization: `${token}`,
      "Content-Type":"application/json",
    }
     
   }).then((res)=>{
    console.log("res",res)
    setmessage({
      message:"Item Deleted Successfully",
      severity:"success",
      open:true
   })
   })
  console.log("id",id)
  
}

const handleColose =()=>{
  setmessage({
    ...message,
    open:false
  })
}
  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      async function fetchWish(){
           await fetch(
            //'https://myapp-server-side-pqkd.onrender.com/user_side/retrive_wish',
            {
            method:'Get',
             headers:{
               'Authorization': `${token}`,
               "Content-Type":"application/json",
              },
              credentials:"include"
           }).then((data)=>data.json().then((response)=>
           
            setwishItem(response[0].result)
          ))
      }
      fetchWish()
    } catch (error) {
      consol.log(error);
    }
  }, []);
   console.log("wish",wishItem)
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

      {/* Original Wishlist content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: { xs: 2, md: 4 },
          backdropFilter: "blur(5px)",
        }}
      >
        <Grid container spacing={3}>
          <Grid container spacing={3}>
            {wishItem.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item * 0.2,
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 12px 40px rgba(31, 38, 135, 0.25)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <img
                       // src={`https://myapp-server-side-pqkd.onrender.com/uploads/${item.prodImage.replace("uploads","")}`}
                        alt="Product"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "white",
                          "&:hover": { bgcolor: "#ff5c5c", color: "white" },
                        }}
                        onClick={()=> handleDelete(item._id)}
                      >
                        <MdDeleteOutline />
                      </IconButton>
                    </Box>

                    <CardContent>
                      <Typography variant="h6" gutterBottom noWrap>
                         {item.prodName}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <Chip
                          label="New"
                          size="small"
                          color="primary"
                          sx={{ borderRadius: "6px" }}
                        />
                        <Chip
                          label="Limited"
                          size="small"
                          color="secondary"
                          sx={{ borderRadius: "6px" }}
                        />
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography
                          variant="h5"
                          color="primary"
                          sx={{ fontWeight: "bold" }}
                        >
                          ${(item.prodPrice * 1).toFixed(2)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            ml: 2,
                            color: "text.secondary",
                          }}
                        >
                          ${(item.prodPrice * 2).toFixed(2)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          startIcon={<FaShoppingCart />}
                          fullWidth
                          sx={{
                            borderRadius: "8px",
                            background:
                              "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
                            },
                          }}
                        >
                          Add to Cart
                        </Button>
                        <IconButton
                          sx={{
                            bgcolor: "#f5f5f5",
                            "&:hover": { bgcolor: "#ffebee", color: "#ff1744" },
                          }}
                        >
                          <FaRegHeart />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
            <Snackbar open={message.open} autoHideDuration={6000} onClose={handleColose}>
              <Alert severity={message.severity} open={message.open} onClose={handleColose} sx={{ width: '100%' }}>
                {message.message}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Box>
       
    </Box>
  );
}

export default Wishlist;
