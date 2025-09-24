import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Container,
  Avatar,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  FaTrash,
  FaLock,
  FaLockOpen,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import keys from "../../../keys";

function ListUsers() {
  let [message, setmessage] = useState({
    message: "",
    severity: "success",
    open: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  let [users, setusers] = useState([]);
  const DeleteUser = (id) => {
    setusers(users.filter(user => user._id !== id));
    console.log("userId", id);
    let DeletResponse = axios.delete(
      `${keys.SERVER_API_CALL}/admin_side/delete_user/${id}`
    );
    if (DeletResponse) {
      DeletResponse.then((res) => {
        console.log(res.data);
        setmessage({
          message: `${(res.data.message, res.data.name)}`,
          severity: "success",
          open: true,
        });
      });
    }
  };
  const activeUser =async(id,status)=>{
    console.log(id,status)
    let respons = await axios.put(`${keys.SERVER_API_CALL}/admin_side/update_user_status/${id}`,{status:status})
     setusers(users.map(user=>{if(user._id===id){
      return{...user,isDisabled:status}
     }
     return user
    }
    ))
    if(respons && status === 'true'){
      setmessage({
        message:"blocked",
        severity:"warning",
        open:true
      })
    }else{
      setmessage({
        message:"unblocked",
        severity:"success",
        open:true
      })
    }
  }

  useEffect(() => {
    let response = fetch(`${keys.SERVER_API_CALL}/admin_side/get_all_users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      response
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          let userdata = data.map((item) => item.userData);
          console.log("users",userdata);
          setusers(userdata);
          
          setmessage({
            message:`${userdata.name}`,
            severity: "success",
            open: true,
          })
        });
    }

    // const [users] = useState([
    // { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    // { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'blocked' },
    // Add more mock data as needed
    // ]);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleClose = async () => {
    setmessage({
      ...message,
      open: false,
    });
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600, color: "#1a237e" }}
      >
        User Management
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "white",
            "&:hover": {
              "& > fieldset": {
                borderColor: "#1a237e",
              },
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch color="#666" />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filteredUsers.map((user) => (
          <Card
            key={user._id}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
              borderRadius: 2,
              background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#1a237e",
                  width: 50,
                  height: 50,
                }}
              >
                <FaUserCircle size={30} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<FaTrash />}
                sx={{
                  boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={() => DeleteUser(user._id)}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                color={user.isDisabled === "false" ? "success" : "warning"}
                startIcon={
                  user.isDisabled === "false" ? <FaLockOpen /> : <FaLock />
                }
                sx={{
                  boxShadow:
                    user.isDisabled === "true"
                      ? "0 4px 12px rgba(46, 125, 50, 0.2)"
                      : "0 4px 12px rgba(237, 108, 2, 0.2)",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={
                  user.isDisabled === "true"?
                  ()=>activeUser(user._id,"false"):
                  ()=>activeUser(user._id,"true")
                }

              >
                {user.isDisabled === "true" ? "Unblock" : "Block"}
              </Button>
            </Box>
          </Card>
        ))}

        {filteredUsers.length === 0 && (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#666",
              mt: 4,
            }}
          >
            No users found matching your search
          </Typography>
        )}
        <Snackbar open={message.open} autoHideDuration={1000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default ListUsers;
