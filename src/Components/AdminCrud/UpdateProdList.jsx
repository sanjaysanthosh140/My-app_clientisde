import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Chip,
  Divider,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import UpdateProd from "./UpdateProd";

function UpdateProdList() {
  let [updateitem, setUpdateItem] = useState(false);
  let [products, setProducts] = useState([]);
  let [filterprod, setFilterProd] = useState(null);
  let [message, setmessage] = useState({
    message: "",
    severity: "",
    open: false,
  });
  const updateOnenow = async (id) => {
    try {
      setUpdateItem(true);
      const extractProd = products.filter((item) => item._id === id);
      setFilterProd(extractProd);
    } catch (error) {
      console.log(error);
    }
  };
  const Prodreupdate = async () => {
    setUpdateItem(false);
  };

  useEffect(() => {
    try {
      const response = fetch(
        "https://myapp-server-side-pqkd.onrender.com/admin_side/get_all_products"
      );
      if (response) {
        response
          .then((res) => res.json())
          .then((data) => {
            let itemUpdate = data.map((item) => item.prodData);
            console.log([itemUpdate]);
            setProducts(itemUpdate);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return updateitem ? (
    <UpdateProd prodData={filterprod} prodreupdate={Prodreupdate} />
  ) : (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh", py: 3 }}>
      <Snackbar
        open={message.open}
        autoHideDuration={3000}
        //onClose={closeHandler}
      >
        <Alert open={message.open} severity={message.severity}>
          {message.message}
        </Alert>
      </Snackbar>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1200,
          margin: "auto",
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#2196f3",
            mb: 4,
            fontWeight: 500,
            letterSpacing: "0.5px",
          }}
        >
          Product Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            p: 2,
            borderRadius: "12px",
            border: "1px solid #e3f2fd",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#2196f3",
                  bgcolor: "#fafafa",
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2196f3",
              borderRadius: "8px",
              boxShadow: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#1976d2",
                transform: "translateY(-2px)",
              },
            }}
          >
            Filter
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "12px",
                border: "1px solid #e3f2fd",
                boxShadow: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(33, 150, 243, 0.1)",
                },
              }}
            >
              {products.map((products) => (
                <CardContent key={products._id}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#2196f3",
                      mb: 2,
                      fontWeight: 500,
                    }}
                  >
                    {products.prodName}
                  </Typography>

                  <Typography sx={{ color: "#757575", mb: 2 }}>
                    Category Name
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: "#2196f3",
                      mb: 3,
                      fontWeight: 600,
                    }}
                  >
                    ${`${products.prodPrice}`}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#2196f3",
                        borderRadius: "8px",
                        boxShadow: "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "#1976d2",
                          transform: "translateY(-2px)",
                        },
                      }}
                      onClick={() => updateOnenow(products._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: "#2196f3",
                        borderColor: "#2196f3",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "#1976d2",
                          bgcolor: "#e3f2fd",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UpdateProdList;
