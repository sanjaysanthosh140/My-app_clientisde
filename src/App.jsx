import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignupPage from "./Components/Signup";
import Prodpg from "./Components/Prodpg";
import Frvcart from "./Components/Frvcart";
import ProtectRoute from "./Authenticate/ProtectRoute";
import Setting from "./Components/Setting";
import Dashboard from "./Components/Dashboard";
import Adprod from "./Components/Adprod";
import DeleteProd from "./Components/AdminCrud/DeleteProd";
import ListUsers from "./Components/AdminCrud/ListUsers";
import UpdateProd from "./Components/AdminCrud/UpdateProd";
import UpdateProdList from "./Components/AdminCrud/UpdateProdList";
import Wishlist from "./Components/Wishlist";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/prod" element={<Prodpg />} />
          <Route path="/Cart" element={

            <ProtectRoute>
              <Frvcart/>
            </ProtectRoute>
            } />
          <Route path="/admin" element={<Setting/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/add-product" element={<Adprod/>} />
          <Route path="/delete-product" element={<DeleteProd/>} />
          <Route path="/users" element={<ListUsers/>} />
          <Route path="/update-product" element={<UpdateProdList/>} />
          <Route path="/Wish" element={<Wishlist/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
