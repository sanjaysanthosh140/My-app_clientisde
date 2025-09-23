import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignupPage from "./Components/Signup";
import Prodpg from "./Components/Prodpg";
//import Frvcart from "./Components/Frvcart";
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
import Tools_list from "./Components/Tools_list";
import Sub_home_contUpdate from "./Components/sub_home_contUpdate";
import Footer from "./Components/Footer";

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

          <Route
            path="/stack_js"
            element={<Stackcomponent stack={"AI_web_tools"} />}
          />
          <Route
            path="/stack_Ml"
            element={<Stackcomponent stack={"Drop_shiping"} />}
          />
          <Route
            path="/stack_cyber"
            element={<Stackcomponent stack={"AI_DETECTOR"} />}
          />
          <Route
            path="/stack_python"
            element={<Stackcomponent stack={"AI_Education_tools"} />}
          />
          <Route
            path="/stack_datascience"
            element={<Stackcomponent stack={"AI_Video_Generator"} />}
          />

          {/* web_tools */}
          <Route path="/ai_web_tools" element={<Tools_list props={"web"} />} />
          <Route path="/api" element={<Tools_list props={"api"} />} />
          <Route path="/db_query" element={<Tools_list props={"db"} />} />
          <Route path="/app" element={<Tools_list props={"app"} />} />
          {/* Drop_shiping */}
          <Route
            path="/web_design_tools"
            element={<Tools_list props={"web_design_tools"} />}
          />
          <Route
            path="/shopify_store"
            element={<Tools_list props={"shopify_store"} />}
          />
          <Route path="/seo_tool" element={<Tools_list props={"seo_tool"} />} />

          <Route
            path="/google_add"
            element={<Tools_list props={"google_add"} />}
          />

          {/* Detection_AI */}
          <Route
            path="/ai_free_tools"
            element={<Tools_list props={"free_tools"} />}
          />

          <Route
            path="/ai_bypasser"
            element={<Tools_list props={"bypasser"} />}
          />

          <Route
            path="/ai_content_detect"
            element={<Tools_list props={"content_detect"} />}
          />

          <Route
            path="/ai_humanizor"
            element={<Tools_list props={"humanizor"} />}
          />

          {/*edu_tools-ai  */}
          <Route
            path="/edu_tool"
            element={<Tools_list props={"edu_tools"} />}
          />

          <Route path="/edu_img" element={<Tools_list props={"edu_img"} />} />

          <Route
            path="/edu_mind_map"
            element={<Tools_list props={"edu_mind_map"} />}
          />

          <Route
            path="/edu_video"
            element={<Tools_list props={"edu_video"} />}
          />

          {/* video_generator_ai_tools */}
          <Route
            path="/AI_Video_Generator"
            element={<Tools_list props={"AI_Video_Generator"} />}
          />
          <Route
            path="/Ai_video_summarizor"
            element={<Tools_list props={"Ai_video_summarizor"} />}
          />
          <Route path="/convert_to_short" element={<Tools_list props={"convert_to_short"} />} />
          
          <Route path="/UGC_video" element={<Tools_list props={"UGC_video"} />} />

          {/* ################################## */}

          {/* <Route
            path="/Cart"
            element={
              <ProtectRoute>
                <Frvcart />
              </ProtectRoute>
            }
          /> */}

          <Route path="/admin" element={<Setting />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<Adprod />} />
          <Route path="/delete-product" element={<DeleteProd />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/update-product" element={<UpdateProdList />} />
          <Route path="/Home_contend" element={<HomeAdd />} />
          <Route path="/sub_home_upload" element={<HomeSub_cont />} />
          <Route path="/delete_Home" element={<Delete_home_cont />} />
          <Route path="/Wish" element={<Wishlist />} />
          <Route path="/all-products" element={<Sub_home_contUpdate />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
