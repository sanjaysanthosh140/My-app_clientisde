import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { Cookies } from "react-cookie";
import axios from "axios";
// Custom styled components
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const StyledCard = styled(Card)({
  maxWidth: 300,
  backgroundColor: "#ffffff",
  position: "relative",
  marginTop: "5%",
  marginRight: "5%",
  overflow: "hidden",
  transition: "all 0.3s ease",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.20)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20px 20px, rgba(230, 240, 255, 0.2) 2px, transparent 0),
      radial-gradient(circle at 40px 40px, rgba(230, 240, 255, 0.2) 2px, transparent 0)
    `,
    backgroundSize: "50px 50px",
    opacity: 0.5,
    zIndex: 1,
  },
});

const ProductImage = styled(CardMedia)({
  height: 130,
  transition: "transform 0.4s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const PriceBox = styled(Box)({
  position: "absolute",
  top: 15,
  right: 15,
  background: "rgba(255, 255, 255, 0.95)",
  padding: "15px 15px",
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  animation: `${float} 3s ease-in-out infinite`,
});

const ActionButton = styled(Button)({
  background:
    "linear-gradient(135deg, rgb(228, 242, 255) 0%, rgb(204, 229, 255) 100%)",
  color: "rgb(41, 98, 255)",
  textTransform: "none",
  fontSize: "0.95rem",
  padding: "10px 20px",
  borderRadius: "12px",
  transition: "all 0.3s ease",
  "&:hover": {
    background:
      "linear-gradient(135deg, rgb(204, 229, 255) 0%, rgb(179, 217, 255) 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 5px 15px rgba(41, 98, 255, 0.2)",
  },
});

const TagBox = styled(Box)({
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "8px",
  fontSize: "0.75rem",
  fontWeight: 500,
  backgroundColor: "rgba(41, 98, 255, 0.08)",
  color: "rgb(41, 98, 255)",
  margin: "0 4px 4px 0",
});

const ProductCard = () => {

  const cookies = new Cookies();
  let user = cookies.get("userName");
  let [cart, setcart] = useState([]);
  let [name, setname] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const handleClose = () => {
    setname({
      ...name,
      open: false,
    });
  };
  const handleCart = async (id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.get(
     `http//:localhost:4000/user_side/newCart/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (response) {
      console.log('res',response.data);
      setname({
         message: `${response.data}`,
         severity: "success",
         open: true,
      })
    }
  };
   
  const handleWishlist = async(id) =>{
    try {
      console.log(id);
      const token =localStorage.getItem("token");
      const response = await axios.get(
        `http//:localhost:4000/user_side/wishList/${id}`,
        {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json",
          Authorization:`${token}`
        }
      })
      if(response.data.result){
        console.log('wishres',response);
        setname({
          message:"product is added to wishlist",
          severity: "success",
          open: true,
        })
        
      }else{
        console.log('wishres',response);
        setname({
          message:`hay ${user},this product is already in wishlist`,
          severity: "success",
          open: true,
        })
      }

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    let user = cookies.get("userName");
    console.log(user);
    if(user !==undefined){
      setname({
        message: `welcome ${user}`,
        severity: "success",
        open: true,
      });
    }else{
      setname({
        message: `welcome back `,
        severity: "success",
        open: true,
      });
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
         "http//:localhost:4000/user_side/products"
        );
        const cards = response.data[0];
        console.log(cards);
        setcart(cards);
      } catch (error) {
        setname({
          message: "Failed to fetch products",
          severity: "error",
          open: true,
        });
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Snackbar open={name.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          severity={name.severity}
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          {name.message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px", // adds space between cards
          flexWrap: "wrap", // allows cards to wrap on smaller screens
          padding: "20px",
        }}
      >
        {cart.map((card) => (
          <StyledCard key={card._id}>
            <Box sx={{ position: "relative" }}>
              <ProductImage
                image={
                  `http//:localhost:4000/uploads/${card.prodImage.replace("uploads","")}`
                }
                title="Product"
              />

              <PriceBox>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "rgb(41, 98, 255)" }}
                >
                  ${card.prodPrice}
                </Typography>
              </PriceBox>
            </Box>

            <CardContent sx={{ position: "relative", zIndex: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                {card.prodName}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <TagBox>New Arrival</TagBox>
                <TagBox>Best Seller</TagBox>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  color: "rgba(0, 0, 0, 0.6)",
                  lineHeight: 1.6,
                }}
              >
                {card.prodDescription}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor:
                        i < 4 ? "rgb(41, 98, 255)" : "rgb(228, 242, 255)",
                      margin: "0 2px",
                    }}
                  />
                ))}
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: "rgba(0, 0, 0, 0.6)" }}
                >
                  (436)
                </Typography>
              </Box>

              {/* <ActionButton fullWidth onClick={() => handleCart(card._id)}> */}
                {/* Add to Collection */}
              {/* </ActionButton> */}
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <ActionButton fullWidth onClick={() => handleCart(card._id)}>
                  Add to Collection
                </ActionButton>
                <ActionButton
                  fullWidth
                  onClick={() => handleWishlist(card._id)}
                  sx={{
                    background:
                      "linear-gradient(135deg, rgb(255, 228, 230) 0%, rgb(255, 204, 213) 100%)",
                    color: "rgb(255, 41, 98)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, rgb(255, 204, 213) 0%, rgb(255, 179, 191) 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(255, 41, 98, 0.2)",
                    },
                  }}
                >
                  Add to Wishlist
                </ActionButton>
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </Box>
    </>
  );
};

export default ProductCard;
