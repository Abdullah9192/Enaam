import React, { useEffect } from "react";
import "./ProductCard.css";
import image from "../../Assets/Image.png";
import { calculatePercentage } from "../../Utils/Utils";
import { cartData, DefaultUrl, User } from "../../Atom";
import { useRecoilState } from "recoil";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProductCard = (product) => {
  // eslint-disable-next-line
  const [userData, setUserData] = useRecoilState(User);
  // eslint-disable-next-line
  const [defaultUrl, setDefaultUrl] = useRecoilState(DefaultUrl);
  // eslint-disable-next-line
  const [cart, setCart] = useRecoilState(cartData);
  let progressBar = calculatePercentage(
    product.Product.soldTickets,
    product.Product.totalTickets
  );

  useEffect(() => {
    const handleResize = () => {
      const zoomLevel = window.devicePixelRatio || 1;
      const root = document.documentElement;
      root.style.setProperty("--zoom-scale", zoomLevel >= 1.75 ? "1.1" : "1");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let navigate = useNavigate();
  const handleAddToCart = () => {
    let LogedIn = localStorage.getItem("LogedIn");
    let userId = userData.id;
  
    if (!LogedIn || LogedIn === "false") {
      navigate("/login");
      return false;
    }
  
    const Item = product.Product;
  
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === Item.id);
      let updatedCart;
  
      if (itemExists) {
        // Increase the quantity of the existing product
        updatedCart = prevCart.map((item) =>
          item.id === Item.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        toast.info("Increased product quantity in the cart", { theme: "colored" });
      } else {
        // Add the product as a new entry with quantity 1
        updatedCart = [...prevCart, { ...Item, quantity: 1 }];
        toast.success("Product added to cart", { theme: "colored" });
      }
  
      const myCart = {
        cartItems: updatedCart,
        total: 0,
        subTotal: 0,
      };
  
      axios
        .put(`${defaultUrl}/cart/${userId}`, myCart, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log("Cart updated successfully", res.data);
        })
        .catch((err) => {
          toast.error("Error updating the cart");
          console.error(err);
        });
  
      return updatedCart;
    });
  };
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={product.Product.name} className="" />
      </div>
      <div className={`product-details`}>
        <div className="details-header pb-0 mb-0">
          <div className="product-title w-75 mt-2 font-weight-bold">
            <h4>{product.Product.name}</h4>
          </div>
          <div className="product-seller w-50">
            <p className="compe">
              <span>{product.Product.soldTickets}</span> Entries out of{" "}
              <span> {product.Product.totalTickets}</span>
            </p>
            <div className="progress progress-height">
              <div
                className={`progress-bar progress-bar-striped progress-bar-animated ${
                  progressBar >= 80
                    ? "bg-danger"
                    : progressBar >= 70
                    ? "bg-warning"
                    : progressBar <= 25
                    ? "bg-success"
                    : ""
                }`}
                role="progressbar"
                aria-valuenow="35"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${progressBar}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <h5 className="price">Ticket Price</h5>
          </div>
          <div className="col-6">
            <h5 className="Black text-end">PKR {product.Product.price}</h5>
          </div>
        </div>
        <p className="product-description mt-0">
          {product.Product.description}
        </p>
        <div className="details-actions">
          <Button className="btn-details" variant="secondary">
            Details
          </Button>
          <Button
            className="btn-add-to-cart"
            variant="warning"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
