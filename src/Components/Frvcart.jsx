import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  Container,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { StripeCheckout } from "react-stripe-checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import StripeButton from "./StripeButton";
const stripePromise = loadStripe(
  "pk_test_51Qx0ZhP6gLEevHxrHpjAHjZJ9qtKbUhAp7CDxrP37XSgevGaZvvpkNi0QMEHinF15oHiZAakOmrqSizLDlMkdUao00u0Ir154H"
);
function Frvcart() {
  let [cart, setcart] = useState([]);
  let [Total, setTotal] = useState(0);
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleDecrement = async (proId, action) => {
    try {
      let token = localStorage.getItem("token");
      let response = await axios.put(
        // "https://myapp-server-side-pqkd.onrender.com/user_side/decrement",
        { proId, action },
        {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("resForreFet", response);
      if (response) {
        const response = await axios.get(
          // "https://myapp-server-side-pqkd.onrender.com/user_side/Frv_carts",
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (response) {
          let itemOnly = response.data.map((item) => item.items);
          console.log("itemOnlyR", itemOnly);

          let subTotal = 0;
          itemOnly.forEach((item) => {
            subTotal += item.productPrice;
          });
          console.log("subTotal", subTotal);
          setTotal(subTotal);
          setcart(itemOnly);
        }
        //
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getCartItes = async () => {
      const response = await axios.get(
        //"https://myapp-server-side-pqkd.onrender.com/user_side/Frv_carts",
        {
          withCredentials: true,
          headers: {
            'Authorization':`${token}`,
            'Content-Type':"application/json"
          },
          credentials:"include"
        }
      );

      if (response) {
        let itemOnly = response.data.map((item) => item.items);
        console.log("itemOnlyR", itemOnly);

        setcart(itemOnly);

        let subTotal = 0;
        itemOnly.forEach((item) => {
          subTotal += item.productPrice;
        });
        console.log("subTotal", subTotal);
        setTotal(subTotal);
        //
      }
    };
    getCartItes();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #FFFFFF 0%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
        "& .decorative-image-1": {
          content:
            'url("https://cdn-icons-png.freepik.com/256/9052/9052116.png?ga=GA1.1.1928443594.1716972653&semt=sph")', // Add your image path
          position: "absolute",
          width: "100px",
          height: "100px",
          top: "10%",
          left: "5%",
          animation: "float-1 8s ease-in-out infinite",
          opacity: 0.6,
        },
        "& .decorative-image-2": {
          content:
            'url("https://cdn-icons-png.freepik.com/256/11333/11333990.png?ga=GA1.1.1928443594.1716972653&semt=sph")', // Add your image path
          position: "absolute",
          width: "80px",
          height: "80px",
          top: "30%",
          right: "8%",
          animation: "float-2 6s ease-in-out infinite",
          opacity: 0.5,
        },
        "& .decorative-image-3": {
          content:
            'url("https://cdn-icons-png.freepik.com/256/5083/5083076.png?ga=GA1.1.1928443594.1716972653&semt=sph")', // Add your image path
          position: "absolute",
          width: "120px",
          height: "120px",
          bottom: "15%",
          left: "15%",
          animation: "float-3 10s ease-in-out infinite",
          opacity: 0.4,
        },
        "@keyframes float-1": {
          "0%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(10deg)" },
          "100%": { transform: "translateY(0px) rotate(0deg)" },
        },
        "@keyframes float-2": {
          "0%": { transform: "translate(0px, 0px) rotate(0deg)" },
          "50%": { transform: "translate(-15px, -15px) rotate(-10deg)" },
          "100%": { transform: "translate(0px, 0px) rotate(0deg)" },
        },
        "@keyframes float-3": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.1) rotate(5deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      }}
    >
      {/* Add the decorative elements */}
      <Box className="decorative-image-1" />
      <Box className="decorative-image-2" />
      <Box className="decorative-image-3" />

      <Container
        maxWidth="lg"
        sx={{ py: { xs: 2, sm: 4 }, position: "relative", zIndex: 1 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            animation: "float 6s ease-in-out infinite",
            "@keyframes float": {
              "0%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-10px)" },
              "100%": { transform: "translateY(0px)" },
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              fontSize: { xs: "1.8rem", sm: "2.5rem" },
            }}
          >
            Shopping Cart
          </Typography>
        </Paper>

        {/* {console.log('cart',cart)} */}
        <Grid container spacing={3}>
          {cart.length !== 0 &&
            cart.map((item) => (
              <Grid item xs={12} md={8} key={item.productId}>
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.9)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{ p: { xs: 1, sm: 2 } }}
                    alignItems="center"
                  >
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="img"
                        src="https://cdn-icons-png.freepik.com/256/9052/9052116.png?ga=GA1.1.1928443594.1716972653&semt=sph"
                        alt="Product"
                        sx={{
                          width: "100%",
                          borderRadius: 2,
                          transform: "rotate(-3deg)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "rotate(0deg) scale(1.05)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        {item.productName}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#FF6B6B",
                          fontWeight: 500,
                          fontSize: { xs: "1.1rem", sm: "1.3rem" },
                        }}
                      >
                        ${item.productPrice}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box
                        display="flex"
                        justifyContent={{ xs: "center", sm: "flex-start" }}
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          sx={{
                            minWidth: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(45deg, #FF6B6B, #FF8E53)",
                            boxShadow: "0 4px 15px rgba(255,107,107,0.3)",
                          }}
                          onClick={() =>
                            handleDecrement(item.productId, "decrement")
                          }
                        >
                          -
                        </Button>
                        <Typography sx={{ mx: 2, fontWeight: 600 }}>
                          {item.quantity}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            minWidth: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(45deg, #4ECDC4, #45B7AF)",
                            boxShadow: "0 4px 15px rgba(78,205,196,0.3)",
                          }}
                          onClick={() =>
                            handleDecrement(item.productId, "increment")
                          }
                        >
                          +
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.9)",
                position: "sticky",
                top: 20,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Order Summary
              </Typography>
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  background: "rgba(78,205,196,0.1)",
                }}
              >
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography>Subtotal:</Typography>
                  <Typography fontWeight="600">${Total}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography>Shipping:</Typography>
                  <Typography fontWeight="600">$5.00</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="#FF6B6B">
                    ${Total + 5}
                  </Typography>
                </Box>
              </Box>
              {/* <StripeButton amount={parseInt(Total)}/> */}
              <Elements
                stripe={stripePromise}
                options={{
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#FF6B6B",
                      colorBackground: "rgba(255, 255, 255, 0.9)",
                      colorText: "#424770",
                      colorDanger: "#ff5252",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      borderRadius: "8px",
                      spacingUnit: "4px",
                    },
                    rules: {
                      ".Input": {
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        padding: "12px",
                        transition: "all 0.3s ease",
                      },
                      ".Input:focus": {
                        boxShadow: "0 4px 8px rgba(255,107,107,0.2)",
                        transform: "translateY(-1px)",
                      },
                      ".Label": {
                        fontWeight: "600",
                        fontSize: "14px",
                      },
                      ".Button": {
                        background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
                        boxShadow: "0 4px 15px rgba(255,107,107,0.3)",
                        padding: "12px 24px",
                        fontSize: "16px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      },
                      ".Button:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(255,107,107,0.4)",
                      },
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <StripeButton amount={parseInt(Total)} />
                </Box>
              </Elements>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Frvcart;
