import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Blogs from "../../Components/Blogs/Blogs";
import PrizesHero from "../../Components/PrizesHero/PrizesHero";
import PrizeDraws from "../../Components/PrizeDraws/PrizeDraws";

const Prizes = () => {
  return (
    <div>
      <Navbar />
      <PrizesHero />
      <PrizeDraws />
      <Testimonials />
      <Blogs />
      <Footer />
    </div>
  );
};

export default Prizes;
