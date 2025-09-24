import { Box, Card, Typography, Button, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import keys from "../../../keys";

function DeleteProd() {
  const [productItems, setProductItes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, SetMessage] = useState({
    message: "",
    severity: "",
    open: false,
  });
  const deleteProduct = async (id) => {
    try {
      console.log(id);
      setProductItes(productItems.filter((product) => product._id !== id));
      const response = await axios.delete(
        `${keys.SERVER_API_CALL}/admin_side/delete_product/${id}`
      );
      if (response) {
        console.log("respoD", response);
        SetMessage({
          message: "Product Deleted Successfully",
          severity: "success",
          open: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeHandler = () => {
    SetMessage({
      ...message,
      open: false,
    });
  };
  useEffect(() => {
    const prodData = fetch(
      `${keys.SERVER_API_CALL}/admin_side/get_all_products`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (prodData) {
      prodData
        .then((res) => res.json())
        .then((data) => {
          let productDetals = data.map((item) => item.prodData);
          console.log(productDetals);
          setProductItes(productDetals);
        });
    }
  }, []);
  // const dummyProducts = [
  // { id: 1, name: "Premium Dumbbell", price: "$99.99", stock: 45, image: "https://example.com/dumbbell.jpg" },
  // { id: 2, name: "Resistance Band", price: "$29.99", stock: 60, image: "https://example.com/band.jpg" },
  // { id: 3, name: "Kettlebell Pro", price: "$79.99", stock: 30, image: "https://example.com/kettlebell.jpg" },
  // ];

  const filteredProducts = productItems.filter((product) =>
    product.prodName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        p: 5,
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* Header Section remains same */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "#1a237e",
          }}
        >
          <FiPackage size={32} />
          Manage Products
        </Typography>
      </motion.div>

      {/* Enhanced Search Bar with functionality */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 5,
            backgroundColor: "#f8f9fa",
            p: 2.5,
            borderRadius: 3,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <BiSearch size={28} color="#5c6bc0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products to delete..."
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "1.1rem",
              backgroundColor: "transparent",
            }}
          />
        </Box>
      </motion.div>

      {/* Products Grid with filtered results */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 4,
        }}
      >
        {filteredProducts.map((product, index) => (
          // Rest of the product card code remains the same
          <motion.div
            key={product._id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ y: -8 }}
          >
            {/* Product card content remains same */}
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 15px 35px rgba(1, 1, 1, 0.15)",
                },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`http://localhost:4000/uploads/${product.prodImage.replace(
                    "uploads",
                    ""
                  )}`}
                  alt={product.prodName}
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </motion.div>

              <Typography
                variant="h5"
                sx={{
                  mt: 3,
                  fontWeight: 600,
                  color: "#1a237e",
                }}
              >
                {product.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#43a047", fontWeight: 600 }}
                >
                  {product.price}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#5c6bc0",
                    backgroundColor: "#e8eaf6",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                  }}
                >
                  Stock: {product.stock}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: "#ff1744",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#d50000",
                    transform: "scale(1.02)",
                    boxShadow: "0 6px 15px rgba(255,23,68,0.4)",
                  },
                }}
                onClick={() => deleteProduct(product._id)}
              >
                <RiDeleteBinLine size={22} />
                Remove Product
              </Button>
            </Card>
          </motion.div>
        ))}
        <Snackbar
          open={message.open}
          autoHideDuration={3000}
          onClose={closeHandler}
        >
          <Alert
            open={message.open}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default DeleteProd;
