import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { FaEdit, FaTrash  } from "react-icons/fa";
import axios from "axios";
import Home_update from "./Home_update";

// Sample data - replace with your actual data source
const Delete_home_cont = () => {
  const [gainupdate, setgainupdate] = useState(false);
  const [updateData,setupdateData] = useState([]);
  const [hoemContents, setHomeContents] = useState([{
    description:"",
    home_Image:""
   }]);
  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.get(
        `http://localhost:4000/admin_side/delete_home_cont/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        console.log("respont", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const  handleEdit =(id)=>{
    try {
      axios.get(`http://localhost:4000/admin_side/get_home_update/${id}`,{
        headers:{
          "Content-Type":"application/json"
        }
      }).then((data)=>{
        console.log(data);
        const upsdateData = data.data
        setupdateData(upsdateData);
        console.log("use",updateData);
        setgainupdate(true);
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetch("http://localhost:4000/admin_side/get_home_cont", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //setHomeContents([data]);
        console.log(data);
        const response = data.map((item) => {
          return {
            id: item._id,
            description: item.description,
            imagePath: item.home_Image,
          };
        });
        setHomeContents(response);
      });
  }, []);
  return (
    <>
    {
      gainupdate && updateData ?(
        <Home_update 
        productData={updateData}
        updategain={setgainupdate}
        />
      ):(
        <Box sx={{ p: 3 }}>
        <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
        >
        Manage Home Content
      </Typography>

      <Grid container spacing={3}>
        {hoemContents.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
              }}
              >
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:4000/uploads/${item.imagePath}`}
                alt={`Home content ${item.id}`}
                sx={{ objectFit: "cover" }}
                />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<FaTrash />}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                      },
                    }}
                    onClick={() => handleDelete(item.id)}
                    >
                    Delete
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<FaEdit />}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                      },
                    }}
                    onClick={() => handleEdit(item.id)}
                    >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    
      
    </Box>
      )}
  </>
  );
};

export default Delete_home_cont;
