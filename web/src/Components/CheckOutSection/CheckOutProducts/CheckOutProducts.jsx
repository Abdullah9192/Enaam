import React, { useEffect } from "react";
import image from "../../../Assets/Image.png";
import { cartData } from "../../../Atom";
import { useRecoilState } from "recoil";
import emtycart from "../../../Assets/emptycart.svg";

const CheckOutProducts = ({ onTotalChange }) => {
  // eslint-disable-next-line
  const [cart, setCart] = useRecoilState(cartData);

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, product) => acc + product.price * (product.quantity || 1),
      0
    );
    onTotalChange(newTotal);
  }, [cart, onTotalChange]);


  return (
    <>
      {cart.length > 0 ? (
        cart.map((product) => (
          <div className="product-card1" key={product.id}>
            <div className="product-image1">
              <img src={image} alt={product.title} />
            </div>
            <div className="product-details1">
              <div className="d-flex align-items-center">
                <div className="product-title w-50 font-weight-bold ">
                  <h4>{product.name}</h4>
                </div>
                <div className="w-50 text-end">
                  <h5 className="Black">Rs: {product.price} PKR</h5>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center mt-3">
                  <div className="w-50">Categories</div>
                  <div className="w-50">
                    <div className="d-flex align-items-center justify-content-end">
                      Quantity:
                      <span className="square bg-light border d-flex justify-content-center align-items-center" style={{width:"30px"}}>{product.quantity || 1}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="product-description mt-3">{product.description}</p>
            </div>
          </div>
        ))
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "400px" }}
        >
          <img src={emtycart} className="img-fluid" alt="empty cart" />
        </div>
      )}
    </>
  );
};

export default CheckOutProducts;
