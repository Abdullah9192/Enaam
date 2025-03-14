import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPageView from "./Layouts/LandingPage/LandingPageView";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import Prizes from "./Pages/Prizes/Prizes";
import UndefinedPage from "./Pages/UndefinedPage/UndefinedPage";
import EnaamWinners from "./Pages/EnaamWinners/EnaamWinners";
import HangTowerPage from "./Pages/HangTowerWinners/HangTowerPage";
import OffersPage from "./Pages/OffersPage/Offers";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import ForgetPassword from "./Pages/Login/ForgetPassword";
import { ToastContainer } from "react-toastify";
import Cart from "./Pages/Cart/Cart";
import CheckOut from "./Pages/CheckOut/CheckOut";
import MyProfile from "./Pages/MyProfile/MyProfile";
import Quiz from "./Pages/Quiz/Quiz";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<LandingPageView />} />
        <Route path="/prizes" element={<Prizes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/winners" element={<EnaamWinners />} />
        <Route path="/hang-tower-winners" element={<HangTowerPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gamesection" element={<Quiz/>} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="*" element={<UndefinedPage />} />
      </Routes>
      <ToastContainer stacked theme="colored"/>
    </div>
  );
}

export default App;
