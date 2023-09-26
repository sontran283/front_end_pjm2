import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Product from "./pages/user/product/Product";
import Home from "./pages/user/home/Home";
import About from "./pages/user/about/About";
import Contact from "./pages/user/contact/Contact";
import Blog from "./pages/user/blog/Blog";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/Register";
import Cart from "./pages/user/cart/Cart";
import { useEffect } from "react";
import Description from "./pages/user/description/Description";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/changePassword/ChangePassword";
import ListProduct from "./pages/product/ListProduct";
import ListUser from "./pages/admin/ListUser";
import AdminHome from "./layout/admin/adminhome/AdminHome";
import Dashboard from "./pages/admin/Dashboard";
import ListOrder from "./pages/admin/ListOrder";
import ListCategory from "./pages/admin/ListCategory";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminPass from "./pages/admin/AdminPass";
import CheckOut from "./pages/user/checkout/CheckOut";
import History from "./pages/user/history/History";
import PrivateRouter from "./layout/admin/privateRouter/PrivateRouter";
import Loading from "./base/loading/Loading";
import UploadFile from "./pages/upload-file";
import Page404 from "./pages/user/page404/Page404";

function App() {
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  // khi chuyen trang, thi mac dinh day len tren
  const location = useLocation();

  useEffect(() => {
    console.log("location.pathname", location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (userLocal) {
      if (userLocal.role === 0 && !location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/dashboard";
      }
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Page404 />} />

        <Route path="/admin" element={<PrivateRouter />}>
          {/* <Route index element={<AdminHome />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="listuser" element={<ListUser />} />
          <Route path="listproduct" element={<ListProduct />} />
          <Route path="listorder" element={<ListOrder />} />
          <Route path="listcategory" element={<ListCategory />} />
          <Route path="adminprofile" element={<AdminProfile />} />
          <Route path="adminpass" element={<AdminPass />} />
          <Route path="upload-file" element={<UploadFile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
