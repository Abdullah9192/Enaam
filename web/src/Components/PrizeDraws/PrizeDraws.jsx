import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useRecoilState } from "recoil";
import { productData } from "../../Atom";
import { GetWihoutHead } from "../../Utils/Utils";
const PrizeDraws = () => {
  const [isZoomed, setIsZoomed] = useState(false);
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

  return (
    <div className="container">
      {/* <h1 className="Prizes text-center">Limited-Time Prize Draws</h1> */}
      <div className="row">
        <h1 className="Prizes text-center mt-4">Limited-Time Prize Draws</h1>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={isZoomed ? "col-12" : "col-md-6"}>
              <ProductCard Product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrizeDraws;
