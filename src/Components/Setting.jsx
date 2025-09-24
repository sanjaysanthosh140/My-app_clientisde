
// import {
//   Box,
//   Button,
//   TextField,
//   Card,
//   Typography,
//   Container,
// } from "@mui/material";
// import { FaUser, FaLock } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// export default function Setting() {
//     const navigate = useNavigate();
// const [userData,setuserData] = useState('')

// const handelSub = async (e) =>{
//     e.preventDefault()
//   console.log(userData);
//   navigate('/Dashboard')
// }


// const handleChange = (e)=>{
//     setuserData({
//         ...userData,
//        [e.target.name]:e.target.value
//     })
//     console.log('working');

// }
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundColor: "#ffffff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <Container maxWidth="xs">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.7 }}
//         >
//           <Card
//             sx={{
//               padding: 4,
//               background: "rgba(255, 255, 255, 0.95)",
//               boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
//               borderRadius: 4,
//               border: "1px solid rgba(255, 255, 255, 0.18)",
//             }}
//           >
//             <Typography
//               component={motion.h1}
//               whileHover={{ scale: 1.05 }}
//               variant="h4"
//               align="center"
//               sx={{
//                 mb: 4,
//                 background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Welcome Back
//             </Typography>

//             <Box component="form" onSubmit={handelSub}  sx={{ mt: 2 }}>
//               <motion.div whileHover={{ scale: 1.02 }}>
//                 <TextField
//                   fullWidth
//                   label="Username"
//                   margin="normal"
//                   name="Username"
//                   value={userData.Username}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <FaUser style={{ marginRight: 8, color: "#2196F3" }} />
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       "&:hover fieldset": {
//                         borderColor: "#2196F3",
//                       },
//                     },
//                   }}
//                 />
//               </motion.div>

//               <motion.div whileHover={{ scale: 1.02 }}>
//                 <TextField
//                   fullWidth
//                   type="password"
//                   label="Password"
//                   margin="normal"
//                   name="password"
//                   value={userData.password}
//                   onChange={handleChange}
//                   InputProps={{
//                     startAdornment: (
//                       <FaLock style={{ marginRight: 8, color: "#2196F3" }} />
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       "&:hover fieldset": {
//                         borderColor: "#2196F3",
//                       },
//                     },
//                   }}
//                 />
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   type="submit"
//                   sx={{
//                     mt: 3,
//                     mb: 2,
//                     py: 1.5,
//                     background:
//                       "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//                     boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
//                     "&:hover": {
//                       background:
//                         "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
//                     },
//                   }}

//                 >
//                   Sign In
//                 </Button>
//               </motion.div>
//             </Box>
//           </Card>
//         </motion.div>
//       </Container>
      
//     </Box>
//   );
// }
