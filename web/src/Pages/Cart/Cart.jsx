import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Testimonials from "../../Components/Testimonials/Testimonials";
import CartSection from "../../Components/CartSection/CartSection";

const Cart = () => {
  return (
    <>
      <Navbar />
      <CartSection/>
      <Testimonials />
      <Footer />
    </>
  );
};

export default Cart;
