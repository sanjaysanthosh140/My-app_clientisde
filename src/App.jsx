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
import Stackcomponent from "./Components/Stackcomponent";
import HomeAdd from "./Components/AdminCrud/HomeAdd";
import Home_update from "./Components/AdminCrud/Home_update";
import Delete_home_cont from "./Components/AdminCrud/Delete_home_cont";
import HomeSub_cont from "./Components/AdminCrud/HomeSub_cont";


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

          <Route path="/stack_python" element={<Stackcomponent stack={'python'}/>}/>
          <Route path="/stack_js" element={<Stackcomponent stack={'express'}/>}/>
          <Route path="/stack_Ml" element={<Stackcomponent stack={'mechine_learning'}/>}/>
          <Route path="/stack_datascience" element={<Stackcomponent stack={'data_sciences'}/>}/>
          <Route path="/stack_cyber" element={<Stackcomponent stack={'cyber_security'}/>}/>

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
          <Route path="/Home_contend" element={<HomeAdd/>}/>
          <Route path="/sub_home_upload"  element={<HomeSub_cont/>}/>
          <Route path="/delete_Home"  element={<Delete_home_cont/>} />
          <Route path="/Wish" element={<Wishlist/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
