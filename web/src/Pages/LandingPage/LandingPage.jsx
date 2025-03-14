import React, { useEffect, useState } from "react";
import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import WinnersSection from "../../Components/WinnersSection/WinnersSection";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Container, Row } from "react-bootstrap";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import YoutubeVideo from "../../Components/YoutubeSection/YoutubeVideo";
import DownloadSecton from "../../Components/DownloadSection/DownloadSecton";
import RecentWinners from "../../Components/RecentWinners/RecentWinners";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Blogs from "../../Components/Blogs/Blogs";
import { useNavigate } from "react-router-dom";
import { productData } from "../../Atom";
import { useRecoilState } from "recoil";
import { GetWihoutHead } from "../../Utils/Utils";
import emtycart from "../../Assets/emptycart.svg";
const LandingPage = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  // const [defaultUrl, setDefaultUrl] = useRecoilState(DefaultUrl);
  const [products, setProducts] = useRecoilState(productData);
  useEffect(() => {
    fetchProducts();
    const handleResize = () => {
      const zoomLevel = window.devicePixelRatio || 1;
      setIsZoomed(zoomLevel >= 1.5 || zoomLevel >= 2);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
  }, []);
  const fetchProducts = async () => {
    // console.log("Fetching Products");
    if(products && products.length > 0){
      // console.log("Products already fetched");
      return;
    }else{
      try {
        let res = await GetWihoutHead("/product");
        if (res) {
          // console.log(res.data.tickets,"prepadas");
          setProducts(res.data.tickets);
        }
      } catch (err) {
        console.log(err, "error fetching products");
      }
    }
    return;
  };
  let navigate = useNavigate();
  return (
    <>
      <HeroSlider />
      <WinnersSection />
      <Container className="mb-md-5 mb-3">
        <Row>
          <h1 className="Prizes text-center">Limited-Time Prize Draws</h1>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className={isZoomed ? "col-12" : "col-md-6"}
              >
                <ProductCard Product={product} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <img src={emtycart} alt="empty cart" style={{width:"50%"}}/>
              <h4 className="text-center">No products available at the moment.</h4>
            </div>
          )}
        </Row>
        <div className="text-center">
          <button
            className="btn btn-outline-warning btn-lg float-center mt-4"
            onClick={() => {
              navigate("/prizes");
            }}
          >
            EXPLORE MORE
          </button>
        </div>
      </Container>
      <h1 className="Recent-title text-center mb-5">How It Works</h1>
      <HowItWorks />
      <YoutubeVideo />
      {/* {state} */}
      <DownloadSecton />
      <RecentWinners />
      <Testimonials />
      <Blogs />
    </>
  );
};

export default LandingPage;
